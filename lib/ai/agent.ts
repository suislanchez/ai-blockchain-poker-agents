import type { GameState, Action, Player } from "../poker/types"
import { canCheck, getMinRaise } from "../poker/game-engine"
import { evaluateHand } from "../poker/hand-evaluator"

export interface ResearchResult {
  query: string
  result: string
  cost: number
}

export interface AgentDecision {
  action: Action
  reasoning: string
  researchUsed?: ResearchResult
}

const RESEARCH_COST = 50 // Cost in chips to perform web research

export async function getAIDecision(
  gameState: GameState,
  playerId: string,
  enableResearch = true,
  aiModel?: string, // Added AI model parameter
): Promise<AgentDecision> {
  const player = gameState.players.find((p) => p.id === playerId)
  if (!player) {
    throw new Error("Player not found")
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]
  if (currentPlayer.id !== playerId) {
    throw new Error("Not this player's turn")
  }

  const modelToUse = aiModel || "anthropic/claude-sonnet-4.5"

  // Evaluate current hand strength
  const handStrength =
    gameState.communityCards.length > 0
      ? evaluateHand(player.hand, gameState.communityCards)
      : { rank: 0, name: "Unknown", highCard: 0 }

  const potOdds =
    gameState.pot > 0
      ? (gameState.currentBet - player.currentBet) / (gameState.pot + (gameState.currentBet - player.currentBet))
      : 0

  // Decide if research is needed (based on hand uncertainty and pot size)
  const shouldResearch =
    enableResearch &&
    player.tokens >= RESEARCH_COST &&
    gameState.pot > 100 &&
    handStrength.rank <= 3 && // Uncertain hand
    Math.random() > 0.7 // 30% chance to research

  let researchResult: ResearchResult | undefined

  if (shouldResearch) {
    // Perform web research to inform decision
    const query = buildResearchQuery(gameState, player, handStrength)
    const result = await performResearch(query)
    researchResult = {
      query,
      result,
      cost: RESEARCH_COST,
    }
  }

  const detailedReasoning = generateDetailedReasoning(
    gameState,
    player,
    handStrength,
    potOdds,
    researchResult,
    modelToUse,
  ) // Pass model to reasoning

  // Make decision based on hand strength, pot odds, and research
  const decision = makeDecision(gameState, player, handStrength, potOdds, researchResult)

  decision.reasoning = detailedReasoning + " " + decision.reasoning

  return decision
}

function buildResearchQuery(gameState: GameState, player: Player, handStrength: any): string {
  const handDescription = `${player.hand[0].rank}${player.hand[0].suit} ${player.hand[1].rank}${player.hand[1].suit}`
  const communityDescription = gameState.communityCards.map((c) => `${c.rank}${c.suit}`).join(" ")

  const queries = [
    `poker strategy ${handDescription} with community cards ${communityDescription}`,
    `texas holdem pot odds calculation when to fold`,
    `poker bluffing strategy optimal frequency`,
    `poker hand equity calculator pre-flop odds`,
  ]

  return queries[Math.floor(Math.random() * queries.length)]
}

async function performResearch(query: string): Promise<string> {
  try {
    const response = await fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Research failed")
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error("[v0] Research error:", error)
    return "Research unavailable - proceeding with basic strategy"
  }
}

function makeDecision(
  gameState: GameState,
  player: Player,
  handStrength: any,
  potOdds: number,
  research?: ResearchResult,
): AgentDecision {
  const callAmount = gameState.currentBet - player.currentBet
  const canAffordCall = player.tokens >= callAmount
  const checkAvailable = canCheck(gameState)

  const baseRandom = Math.random()
  let aggressiveness = 0.3 + Math.random() * 0.4 // Random base between 0.3-0.7

  if (research) {
    const researchLower = research.result.toLowerCase()
    if (researchLower.includes("aggressive") || researchLower.includes("raise")) {
      aggressiveness += 0.1
    }
    if (researchLower.includes("fold") || researchLower.includes("conservative")) {
      aggressiveness -= 0.1
    }
  }

  // Add randomness to hand evaluation
  const handScore = (handStrength.rank + Math.random() * 2) / 10
  aggressiveness += handScore * 0.3

  const random = Math.random()
  let action: Action
  let reasoning: string

  if (handStrength.rank >= 7) {
    // Strong hand - but not always aggressive
    if (random > 0.7 && player.tokens > callAmount + getMinRaise(gameState)) {
      const raiseAmount = Math.max(Math.floor(gameState.pot * (0.4 + random * 0.5)), getMinRaise(gameState))
      action = { type: "raise", amount: Math.min(raiseAmount, player.tokens - callAmount) }
      reasoning = `Strong hand (${handStrength.name}) - raising to ${raiseAmount}`
    } else if (canAffordCall) {
      action = { type: "call" }
      reasoning = `Strong hand (${handStrength.name}) - slow playing with a call`
    } else if (checkAvailable) {
      action = { type: "check" }
      reasoning = `Strong hand (${handStrength.name}) - checking`
    } else {
      action = { type: "fold" }
      reasoning = `Can't afford to continue despite strong hand`
    }
  } else if (handStrength.rank >= 4) {
    // Medium hand - highly varied strategy
    if (random > 0.65 && player.tokens > callAmount + getMinRaise(gameState)) {
      const raiseAmount = getMinRaise(gameState) + Math.floor(random * gameState.bigBlind * 2)
      action = { type: "raise", amount: raiseAmount }
      reasoning = `Medium hand (${handStrength.name}) - raising as a test`
    } else if (canAffordCall && random > 0.3) {
      action = { type: "call" }
      reasoning = `Medium hand (${handStrength.name}) - calling to see more`
    } else if (checkAvailable) {
      action = { type: "check" }
      reasoning = `Medium hand (${handStrength.name}) - checking`
    } else if (random > 0.6) {
      action = { type: "fold" }
      reasoning = `Medium hand but deciding to fold`
    } else if (canAffordCall && callAmount <= gameState.bigBlind * 2) {
      action = { type: "call" }
      reasoning = `Medium hand - small bet so calling`
    } else {
      action = { type: "fold" }
      reasoning = `Medium hand but folding`
    }
  } else {
    // Weak hand - mostly defensive but occasionally bluff
    if (checkAvailable) {
      action = { type: "check" }
      reasoning = `Weak hand (${handStrength.name}) - checking`
    } else if (random > 0.85 && player.tokens > callAmount + getMinRaise(gameState) * 3) {
      // Bluff 15% of the time
      action = { type: "raise", amount: getMinRaise(gameState) * 2 }
      reasoning = `Weak hand but bluffing with a raise`
    } else if (callAmount <= gameState.bigBlind && canAffordCall && random > 0.5) {
      action = { type: "call" }
      reasoning = `Weak hand but small bet - calling`
    } else {
      action = { type: "fold" }
      reasoning = `Weak hand (${handStrength.name}) - folding`
    }
  }

  if (research) {
    reasoning += ` [Research: ${research.result.substring(0, 60)}...]`
  }

  return {
    action,
    reasoning,
    researchUsed: research,
  }
}

function generateDetailedReasoning(
  gameState: GameState,
  player: Player,
  handStrength: any,
  potOdds: number,
  research?: ResearchResult,
  aiModel?: string, // Added AI model parameter
): string {
  const parts: string[] = []

  if (aiModel) {
    const modelName = aiModel.split("/")[1] || aiModel
    parts.push(`[Using ${modelName}]`)
  }

  // Hand analysis
  parts.push(
    `Looking at my hand: ${player.hand[0].rank}${player.hand[0].suit} ${player.hand[1].rank}${player.hand[1].suit}.`,
  )

  if (gameState.communityCards.length > 0) {
    const community = gameState.communityCards.map((c) => `${c.rank}${c.suit}`).join(" ")
    parts.push(`Community cards on the table: ${community}.`)
  }

  parts.push(`Current hand strength: ${handStrength.name} (rank ${handStrength.rank}/10).`)

  // Pot odds analysis
  const callAmount = gameState.currentBet - player.currentBet
  if (callAmount > 0) {
    parts.push(`Would need to call ${callAmount} chips into a pot of ${gameState.pot} chips.`)
    parts.push(`Pot odds: ${(potOdds * 100).toFixed(1)}%.`)
  }

  // Stack analysis
  const stackRatio = player.tokens / (player.tokens + gameState.pot)
  if (stackRatio < 0.3) {
    parts.push(`My stack is getting short (${player.tokens} chips), need to be aggressive.`)
  } else if (stackRatio > 0.7) {
    parts.push(`I have a healthy stack (${player.tokens} chips), can be patient.`)
  }

  // Research insight
  if (research) {
    parts.push(`Research insight: ${research.result}`)
  }

  // Strategic thinking
  const opponent = gameState.players.find((p) => p.id !== player.id)
  if (opponent) {
    parts.push(`Opponent has ${opponent.tokens}!`)
    if (opponent.currentBet > gameState.bigBlind * 2) {
      parts.push(`They're betting aggressively, might have a strong hand or bluffing.`)
    }
  }

  return parts.join(" ")
}
