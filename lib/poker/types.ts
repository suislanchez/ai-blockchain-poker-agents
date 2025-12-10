export type Suit = "♠" | "♥" | "♦" | "♣"
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A"

export interface Card {
  suit: Suit
  rank: Rank
}

export interface Player {
  id: string
  name: string
  tokens: number
  hand: Card[]
  folded: boolean
  currentBet: number
  totalBet: number
  isAllIn: boolean
  xHandle?: string
  profileImage?: string
  aiModel?: string // Added AI model field
}

export interface GameState {
  players: Player[]
  deck: Card[]
  communityCards: Card[]
  pot: number
  currentBet: number
  dealerIndex: number
  currentPlayerIndex: number
  stage: "pre-flop" | "flop" | "turn" | "river" | "showdown"
  smallBlind: number
  bigBlind: number
  gameOver: boolean
  winner: string | null
  logs: string[]
}

export type Action =
  | { type: "fold" }
  | { type: "call" }
  | { type: "raise"; amount: number }
  | { type: "all-in" }
  | { type: "check" }
  | { type: "research"; query: string }

export interface HandRanking {
  rank: number
  name: string
  highCard: number
}
