import { Card, HandRanking } from './types';

const rankValues: { [key: string]: number } = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

function getRankValue(card: Card): number {
  return rankValues[card.rank];
}

function sortByRank(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => getRankValue(b) - getRankValue(a));
}

function isFlush(cards: Card[]): boolean {
  const suit = cards[0].suit;
  return cards.every(card => card.suit === suit);
}

function isStraight(cards: Card[]): boolean {
  const sorted = sortByRank(cards);
  const values = sorted.map(getRankValue);
  
  // Check for regular straight
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] - values[i + 1] !== 1) {
      // Check for A-2-3-4-5 straight (wheel)
      if (values[0] === 14 && values[values.length - 1] === 2) {
        const wheelCheck = [14, 5, 4, 3, 2];
        if (JSON.stringify(values) === JSON.stringify(wheelCheck)) {
          return true;
        }
      }
      return false;
    }
  }
  return true;
}

function getCounts(cards: Card[]): { [key: number]: number } {
  const counts: { [key: number]: number } = {};
  for (const card of cards) {
    const value = getRankValue(card);
    counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

export function evaluateHand(playerCards: Card[], communityCards: Card[]): HandRanking {
  const allCards = [...playerCards, ...communityCards];
  let bestHand: HandRanking = { rank: 0, name: 'High Card', highCard: 0 };

  // Generate all possible 5-card combinations
  const combinations = getCombinations(allCards, 5);

  for (const combo of combinations) {
    const hand = evaluateFiveCards(combo);
    if (hand.rank > bestHand.rank || (hand.rank === bestHand.rank && hand.highCard > bestHand.highCard)) {
      bestHand = hand;
    }
  }

  return bestHand;
}

function getCombinations(arr: Card[], size: number): Card[][] {
  if (size > arr.length) return [];
  if (size === arr.length) return [arr];
  if (size === 1) return arr.map(card => [card]);

  const result: Card[][] = [];
  for (let i = 0; i <= arr.length - size; i++) {
    const head = arr[i];
    const tailCombs = getCombinations(arr.slice(i + 1), size - 1);
    for (const tail of tailCombs) {
      result.push([head, ...tail]);
    }
  }
  return result;
}

function evaluateFiveCards(cards: Card[]): HandRanking {
  const sorted = sortByRank(cards);
  const counts = getCounts(cards);
  const values = Object.entries(counts).map(([value, count]) => ({ value: parseInt(value), count }));
  values.sort((a, b) => b.count - a.count || b.value - a.value);

  const isFlushHand = isFlush(cards);
  const isStraightHand = isStraight(cards);
  const highCard = Math.max(...cards.map(getRankValue));

  // Royal Flush
  if (isFlushHand && isStraightHand && sorted[0].rank === 'A' && sorted[1].rank === 'K') {
    return { rank: 10, name: 'Royal Flush', highCard };
  }

  // Straight Flush
  if (isFlushHand && isStraightHand) {
    return { rank: 9, name: 'Straight Flush', highCard };
  }

  // Four of a Kind
  if (values[0].count === 4) {
    return { rank: 8, name: 'Four of a Kind', highCard: values[0].value };
  }

  // Full House
  if (values[0].count === 3 && values[1].count === 2) {
    return { rank: 7, name: 'Full House', highCard: values[0].value };
  }

  // Flush
  if (isFlushHand) {
    return { rank: 6, name: 'Flush', highCard };
  }

  // Straight
  if (isStraightHand) {
    return { rank: 5, name: 'Straight', highCard };
  }

  // Three of a Kind
  if (values[0].count === 3) {
    return { rank: 4, name: 'Three of a Kind', highCard: values[0].value };
  }

  // Two Pair
  if (values[0].count === 2 && values[1].count === 2) {
    return { rank: 3, name: 'Two Pair', highCard: Math.max(values[0].value, values[1].value) };
  }

  // One Pair
  if (values[0].count === 2) {
    return { rank: 2, name: 'One Pair', highCard: values[0].value };
  }

  // High Card
  return { rank: 1, name: 'High Card', highCard };
}
