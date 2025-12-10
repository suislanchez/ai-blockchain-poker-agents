import { GameState, Player, Action, Card } from './types';
import { createDeck, shuffleDeck, dealCards } from './deck';
import { evaluateHand } from './hand-evaluator';

const INITIAL_TOKENS = 1000;
const SMALL_BLIND = 10;
const BIG_BLIND = 20;

export function initializeGame(player1Profile?: any, player2Profile?: any): GameState {
  const players: Player[] = [
    {
      id: 'agent-1',
      name: player1Profile?.name || 'AI Agent Alpha',
      tokens: INITIAL_TOKENS,
      hand: [],
      folded: false,
      currentBet: 0,
      totalBet: 0,
      isAllIn: false,
      xHandle: player1Profile?.xHandle,
      profileImage: player1Profile?.profileImage,
    },
    {
      id: 'agent-2',
      name: player2Profile?.name || 'AI Agent Beta',
      tokens: INITIAL_TOKENS,
      hand: [],
      folded: false,
      currentBet: 0,
      totalBet: 0,
      isAllIn: false,
      xHandle: player2Profile?.xHandle,
      profileImage: player2Profile?.profileImage,
    },
  ];

  const deck = shuffleDeck(createDeck());

  return {
    players,
    deck,
    communityCards: [],
    pot: 0,
    currentBet: 0,
    dealerIndex: 0,
    currentPlayerIndex: 0,
    stage: 'pre-flop',
    smallBlind: SMALL_BLIND,
    bigBlind: BIG_BLIND,
    gameOver: false,
    winner: null,
    logs: ['Game started!'],
  };
}

export function startNewRound(state: GameState): GameState {
  const newState = { ...state };
  
  // Reset deck and shuffle
  newState.deck = shuffleDeck(createDeck());
  newState.communityCards = [];
  newState.pot = 0;
  newState.currentBet = 0;
  newState.stage = 'pre-flop';
  
  // Reset players
  newState.players = newState.players.map(player => ({
    ...player,
    hand: [],
    folded: false,
    currentBet: 0,
    totalBet: 0,
    isAllIn: false,
  }));

  // Move dealer button
  newState.dealerIndex = (newState.dealerIndex + 1) % newState.players.length;
  
  // Deal hole cards
  for (let i = 0; i < 2; i++) {
    for (const player of newState.players) {
      const { dealt, remaining } = dealCards(newState.deck, 1);
      player.hand.push(dealt[0]);
      newState.deck = remaining;
    }
  }

  // Post blinds
  const smallBlindIndex = (newState.dealerIndex + 1) % newState.players.length;
  const bigBlindIndex = (newState.dealerIndex + 2) % newState.players.length;

  newState.players[smallBlindIndex].tokens -= newState.smallBlind;
  newState.players[smallBlindIndex].currentBet = newState.smallBlind;
  newState.players[smallBlindIndex].totalBet = newState.smallBlind;
  newState.pot += newState.smallBlind;

  newState.players[bigBlindIndex].tokens -= newState.bigBlind;
  newState.players[bigBlindIndex].currentBet = newState.bigBlind;
  newState.players[bigBlindIndex].totalBet = newState.bigBlind;
  newState.pot += newState.bigBlind;
  newState.currentBet = newState.bigBlind;

  newState.currentPlayerIndex = (bigBlindIndex + 1) % newState.players.length;
  
  newState.logs.push(`\n--- New Round ---`);
  newState.logs.push(`${newState.players[smallBlindIndex].name} posts small blind: ${newState.smallBlind} x402`);
  newState.logs.push(`${newState.players[bigBlindIndex].name} posts big blind: ${newState.bigBlind} x402`);

  return newState;
}

export function processAction(state: GameState, action: Action): GameState {
  const newState = { ...state };
  const currentPlayer = newState.players[newState.currentPlayerIndex];

  switch (action.type) {
    case 'fold':
      currentPlayer.folded = true;
      newState.logs.push(`${currentPlayer.name} folds`);
      break;

    case 'call':
      const callAmount = newState.currentBet - currentPlayer.currentBet;
      const actualCall = Math.min(callAmount, currentPlayer.tokens);
      currentPlayer.tokens -= actualCall;
      currentPlayer.currentBet += actualCall;
      currentPlayer.totalBet += actualCall;
      newState.pot += actualCall;
      if (currentPlayer.tokens === 0) {
        currentPlayer.isAllIn = true;
        newState.logs.push(`${currentPlayer.name} calls ${actualCall} x402 (ALL IN)`);
      } else {
        newState.logs.push(`${currentPlayer.name} calls ${actualCall} x402`);
      }
      break;

    case 'raise':
      const raiseAmount = action.amount;
      const totalRaise = newState.currentBet - currentPlayer.currentBet + raiseAmount;
      const actualRaise = Math.min(totalRaise, currentPlayer.tokens);
      currentPlayer.tokens -= actualRaise;
      currentPlayer.currentBet += actualRaise;
      currentPlayer.totalBet += actualRaise;
      newState.currentBet = currentPlayer.currentBet;
      newState.pot += actualRaise;
      if (currentPlayer.tokens === 0) {
        currentPlayer.isAllIn = true;
        newState.logs.push(`${currentPlayer.name} raises ${actualRaise} x402 (ALL IN)`);
      } else {
        newState.logs.push(`${currentPlayer.name} raises to ${newState.currentBet} x402`);
      }
      break;

    case 'all-in':
      const allInAmount = currentPlayer.tokens;
      currentPlayer.currentBet += allInAmount;
      currentPlayer.totalBet += allInAmount;
      currentPlayer.tokens = 0;
      currentPlayer.isAllIn = true;
      newState.pot += allInAmount;
      if (currentPlayer.currentBet > newState.currentBet) {
        newState.currentBet = currentPlayer.currentBet;
      }
      newState.logs.push(`${currentPlayer.name} goes ALL IN with ${allInAmount} x402`);
      break;

    case 'check':
      newState.logs.push(`${currentPlayer.name} checks`);
      break;
  }

  // Move to next player
  newState.currentPlayerIndex = getNextPlayerIndex(newState);

  // Check if betting round is complete
  if (isBettingRoundComplete(newState)) {
    return advanceStage(newState);
  }

  return newState;
}

function getNextPlayerIndex(state: GameState): number {
  let nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
  let iterations = 0;
  const maxIterations = state.players.length;
  
  while (iterations < maxIterations && (state.players[nextIndex].folded || state.players[nextIndex].isAllIn)) {
    nextIndex = (nextIndex + 1) % state.players.length;
    iterations++;
  }
  
  return nextIndex;
}

function isBettingRoundComplete(state: GameState): boolean {
  const activePlayers = state.players.filter(p => !p.folded && !p.isAllIn);
  
  if (activePlayers.length === 0) return true;
  
  if (activePlayers.length === 1) {
    // Check if this player has acted (their bet matches current bet)
    const lastActivePlayer = activePlayers[0];
    return lastActivePlayer.currentBet >= state.currentBet;
  }
  
  const maxBet = Math.max(...state.players.map(p => p.currentBet));
  const allMatched = activePlayers.every(p => p.currentBet === maxBet);
  
  return allMatched;
}

function advanceStage(state: GameState): GameState {
  const newState = { ...state };
  
  // Reset current bets for next round
  newState.players.forEach(p => { p.currentBet = 0; });
  newState.currentBet = 0;

  switch (newState.stage) {
    case 'pre-flop':
      // Deal flop (3 cards)
      const { dealt: flop, remaining: afterFlop } = dealCards(newState.deck, 3);
      newState.communityCards = flop;
      newState.deck = afterFlop;
      newState.stage = 'flop';
      newState.logs.push(`\n--- Flop ---`);
      newState.logs.push(`Community cards: ${formatCards(flop)}`);
      break;

    case 'flop':
      // Deal turn (1 card)
      const { dealt: turn, remaining: afterTurn } = dealCards(newState.deck, 1);
      newState.communityCards.push(turn[0]);
      newState.deck = afterTurn;
      newState.stage = 'turn';
      newState.logs.push(`\n--- Turn ---`);
      newState.logs.push(`Community cards: ${formatCards(newState.communityCards)}`);
      break;

    case 'turn':
      // Deal river (1 card)
      const { dealt: river, remaining: afterRiver } = dealCards(newState.deck, 1);
      newState.communityCards.push(river[0]);
      newState.deck = afterRiver;
      newState.stage = 'river';
      newState.logs.push(`\n--- River ---`);
      newState.logs.push(`Community cards: ${formatCards(newState.communityCards)}`);
      break;

    case 'river':
      return determineWinner(newState);
  }

  // Reset to first active player after dealer
  newState.currentPlayerIndex = (newState.dealerIndex + 1) % newState.players.length;
  newState.currentPlayerIndex = getNextPlayerIndex({ ...newState, currentPlayerIndex: newState.dealerIndex });

  return newState;
}

function determineWinner(state: GameState): GameState {
  const newState = { ...state };
  newState.stage = 'showdown';
  newState.logs.push(`\n--- Showdown ---`);

  const activePlayers = newState.players.filter(p => !p.folded);
  
  if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    winner.tokens += newState.pot;
    newState.winner = winner.name;
    newState.logs.push(`${winner.name} wins ${newState.pot} x402 (all others folded)`);
  } else {
    let bestHand = { rank: 0, name: '', highCard: 0 };
    let winner = activePlayers[0];

    for (const player of activePlayers) {
      const hand = evaluateHand(player.hand, newState.communityCards);
      newState.logs.push(`${player.name}: ${formatCards(player.hand)} - ${hand.name}`);
      
      if (hand.rank > bestHand.rank || 
          (hand.rank === bestHand.rank && hand.highCard > bestHand.highCard)) {
        bestHand = hand;
        winner = player;
      }
    }

    winner.tokens += newState.pot;
    newState.winner = winner.name;
    newState.logs.push(`\n${winner.name} wins ${newState.pot} x402 with ${bestHand.name}!`);
  }

  // Check if game is over
  const playersWithTokens = newState.players.filter(p => p.tokens > 0);
  if (playersWithTokens.length === 1) {
    newState.gameOver = true;
    newState.logs.push(`\n🏆 ${playersWithTokens[0].name} wins the game!`);
  }

  return newState;
}

function formatCards(cards: Card[]): string {
  return cards.map(c => `${c.rank}${c.suit}`).join(' ');
}

export function canCheck(state: GameState): boolean {
  const currentPlayer = state.players[state.currentPlayerIndex];
  return currentPlayer.currentBet === state.currentBet;
}

export function getMinRaise(state: GameState): number {
  return state.bigBlind;
}
