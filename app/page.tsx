"use client"

import { useState, useEffect } from "react"
import type { GameState, Action } from "@/lib/poker/types"
import { initializeGame, startNewRound, processAction } from "@/lib/poker/game-engine"
import { getAIDecision } from "@/lib/ai/agent"
import { getPaymentSystem, resetPaymentSystem } from "@/lib/blockchain/token-system"
import { getBlockchain, resetBlockchain } from "@/lib/blockchain/mock-blockchain"
import { PokerTableSimple } from "@/components/poker-table-simple"
import { ProfileConfig } from "@/components/profile-config"
import { MoveHistory } from "@/components/move-history"
import { ManualControls } from "@/components/manual-controls"
import { Button } from "@/components/ui/button"
import { Play, Pause, Settings, Zap, Hand } from "lucide-react"
import { ProjectInfo } from "@/components/project-info"

interface MoveEntry {
  player: string
  action: string
  thinking: string
  timestamp: Date
}

export default function PokerGame() {
  const [showConfig, setShowConfig] = useState(true)
  const [player1Profile, setPlayer1Profile] = useState<any>(null)
  const [player2Profile, setPlayer2Profile] = useState<any>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isManualMode, setIsManualMode] = useState(false)
  const [player1Thinking, setPlayer1Thinking] = useState("")
  const [player2Thinking, setPlayer2Thinking] = useState("")
  const [actionLog, setActionLog] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [moveHistory, setMoveHistory] = useState<MoveEntry[]>([])
  const [currentAction, setCurrentAction] = useState("")
  const [isDealingCards, setIsDealingCards] = useState(false)

  const handleStartGame = (p1: any, p2: any) => {
    setPlayer1Profile(p1)
    setPlayer2Profile(p2)
    const newGame = initializeGame(p1, p2)
    setGameState(startNewRound(newGame))
    setShowConfig(false)

    resetPaymentSystem()
    resetBlockchain()
    const ps = getPaymentSystem()
    newGame.players.forEach((player) => {
      ps.initializePlayer(player.id, player.tokens)
    })
    setMoveHistory([])
    setIsDealingCards(true)
    setTimeout(() => setIsDealingCards(false), 1500)
  }

  useEffect(() => {
    if (!isPlaying || !gameState || gameState.gameOver || isStreaming || isManualMode) return

    const timer = setTimeout(async () => {
      await processNextAction()
    }, 1000)

    return () => clearTimeout(timer)
  }, [isPlaying, gameState, isStreaming, isManualMode])

  const handleManualAction = async (action: Action) => {
    if (!gameState || isStreaming) return

    setIsStreaming(true)
    const currentPlayer = gameState.players[gameState.currentPlayerIndex]

    let actionDisplay = ""
    if (action.type === "call") {
      const callAmount = gameState.currentBet - currentPlayer.currentBet
      actionDisplay = `CALLS ${callAmount}`
    } else if (action.type === "raise") {
      actionDisplay = `RAISES TO ${action.amount}`
    } else if (action.type === "all-in") {
      actionDisplay = "ALL IN!"
    } else if (action.type === "fold") {
      actionDisplay = "FOLDS"
    } else {
      actionDisplay = "CHECKS"
    }

    setCurrentAction(`${currentPlayer.name} ${actionDisplay}`)
    setTimeout(() => setCurrentAction(""), 2500)

    setActionLog((prev) => [...prev.slice(-4), `${currentPlayer.name} ${actionDisplay.toLowerCase()}`])

    const nextState = processAction(gameState, action)

    if (action.type === "call" || action.type === "raise" || action.type === "all-in") {
      const ps = getPaymentSystem()
      const bc = getBlockchain()

      let amount = 0
      if (action.type === "call") {
        amount = gameState.currentBet - currentPlayer.currentBet
      } else if (action.type === "raise") {
        amount = gameState.currentBet - currentPlayer.currentBet + action.amount
      } else if (action.type === "all-in") {
        amount = currentPlayer.tokens
      }

      const tx = ps.payBet(currentPlayer.id, Math.min(amount, currentPlayer.tokens))
      if (tx) {
        bc.addTransaction(tx.id)
      }
    }

    setGameState(nextState)
    setIsStreaming(false)

    if (nextState.stage !== gameState.stage) {
      setIsDealingCards(true)
      setTimeout(() => setIsDealingCards(false), 800)
    }

    if (nextState.stage === "showdown" && nextState.winner) {
      setIsPlaying(false)
      setPlayer1Thinking("")
      setPlayer2Thinking("")

      const winner = nextState.players.find((p) => p.name === nextState.winner)
      if (winner) {
        const ps = getPaymentSystem()
        const bc = getBlockchain()
        const tx = ps.awardPot(winner.id, nextState.pot)
        bc.addTransaction(tx.id)

        setActionLog((prev) => [...prev, `🏆 ${winner.name} WINS ${nextState.pot} chips!`])
      }
    }
  }

  const processNextAction = async () => {
    if (!gameState) return

    try {
      const currentPlayer = gameState.players[gameState.currentPlayerIndex]
      const isPlayer1 = currentPlayer.id === "agent-1"

      if (currentPlayer.folded || currentPlayer.isAllIn) {
        const nextState = processAction(gameState, { type: "check" })
        setGameState(nextState)
        setIsStreaming(false)
        return
      }

      setIsStreaming(true)

      if (isPlayer1) {
        setPlayer2Thinking("")
        setPlayer1Thinking("Analyzing the situation...")
      } else {
        setPlayer1Thinking("")
        setPlayer2Thinking("Analyzing the situation...")
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      const useResearch = Math.random() > 0.7
      const decision = await getAIDecision(gameState, currentPlayer.id, useResearch, currentPlayer.aiModel)

      const reasoning = decision.reasoning

      let actionDisplay = ""
      if (decision.action.type === "call") {
        const callAmount = gameState.currentBet - currentPlayer.currentBet
        actionDisplay = `CALLS ${callAmount}`
      } else if (decision.action.type === "raise") {
        actionDisplay = `RAISES TO ${decision.action.amount}`
      } else if (decision.action.type === "all-in") {
        actionDisplay = "ALL IN!"
      } else if (decision.action.type === "fold") {
        actionDisplay = "FOLDS"
      } else {
        actionDisplay = "CHECKS"
      }

      const streamDuration = reasoning.length * 15

      if (isPlayer1) {
        setPlayer1Thinking(reasoning)
      } else {
        setPlayer2Thinking(reasoning)
      }

      await new Promise((resolve) => setTimeout(resolve, streamDuration))

      setCurrentAction(`${currentPlayer.name} ${actionDisplay}`)
      setTimeout(() => setCurrentAction(""), 2500)

      if (decision.researchUsed) {
        const ps = getPaymentSystem()
        const tx = ps.payResearchFee(currentPlayer.id, decision.researchUsed.cost)
        if (tx) {
          const bc = getBlockchain()
          bc.addTransaction(tx.id)
        }
      }

      setMoveHistory((prev) => [
        ...prev,
        {
          player: currentPlayer.name,
          action: actionDisplay,
          thinking: reasoning,
          timestamp: new Date(),
        },
      ])

      await new Promise((resolve) => setTimeout(resolve, 500))

      let actionText = `${currentPlayer.name} ${actionDisplay.toLowerCase()}`
      if (decision.researchUsed) {
        actionText += " 🔍"
      }

      setActionLog((prev) => [...prev.slice(-4), actionText])

      const nextState = processAction(gameState, decision.action)

      if (decision.action.type === "call" || decision.action.type === "raise" || decision.action.type === "all-in") {
        const ps = getPaymentSystem()
        const bc = getBlockchain()

        let amount = 0
        if (decision.action.type === "call") {
          amount = gameState.currentBet - currentPlayer.currentBet
        } else if (decision.action.type === "raise") {
          amount = gameState.currentBet - currentPlayer.currentBet + decision.action.amount
        } else if (decision.action.type === "all-in") {
          amount = currentPlayer.tokens
        }

        const tx = ps.payBet(currentPlayer.id, Math.min(amount, currentPlayer.tokens))
        if (tx) {
          bc.addTransaction(tx.id)
        }
      }

      setGameState(nextState)
      setIsStreaming(false)

      if (nextState.stage !== gameState.stage) {
        setIsDealingCards(true)
        setTimeout(() => setIsDealingCards(false), 800)
      }

      if (nextState.stage === "showdown" && nextState.winner) {
        setIsPlaying(false)
        setPlayer1Thinking("")
        setPlayer2Thinking("")

        const winner = nextState.players.find((p) => p.name === nextState.winner)
        if (winner) {
          const ps = getPaymentSystem()
          const bc = getBlockchain()
          const tx = ps.awardPot(winner.id, nextState.pot)
          bc.addTransaction(tx.id)

          setActionLog((prev) => [...prev, `🏆 ${winner.name} WINS ${nextState.pot} chips!`])
        }
      }
    } catch (error) {
      console.error("Game error:", error)
      setIsPlaying(false)
      setIsStreaming(false)
    }
  }

  const handleStart = () => {
    if (!gameState) return

    if (gameState.gameOver || gameState.stage === "showdown") {
      const newState = startNewRound(gameState)
      setGameState(newState)
      setActionLog([])
      setPlayer1Thinking("")
      setPlayer2Thinking("")
      setCurrentAction("")
      setIsDealingCards(true)
      setTimeout(() => setIsDealingCards(false), 1500)
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setShowConfig(true)
    setGameState(null)
    setIsPlaying(false)
    setActionLog([])
    setPlayer1Thinking("")
    setPlayer2Thinking("")
    setMoveHistory([])
  }

  if (showConfig) {
    return <ProfileConfig onStartGame={handleStartGame} />
  }

  if (!gameState) return null

  const player1 = gameState.players[0]
  const player2 = gameState.players[1]
  const currentPlayer = gameState.players[gameState.currentPlayerIndex]
  const canCheck = currentPlayer.currentBet === gameState.currentBet

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden relative">
      <div className="fixed top-2 right-2 z-100">
        <ProjectInfo />
      </div>

      <div className="bg-black/95 backdrop-blur-sm border-b border-red-900/50 shadow-lg shadow-red-900/20 shrink-0">
        <div className="text-center py-3 px-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent mb-1">
            AI Poker Arena
          </h1>
          <p className="text-gray-400 text-xs md:text-sm">
            {player1.xHandle && player2.xHandle
              ? `@${player1.xHandle} vs @${player2.xHandle}`
              : "Watch autonomous agents battle"}
          </p>

          <div className="flex gap-2 justify-center mt-2 flex-wrap">
            <div className="flex gap-1 bg-gray-900 p-1 rounded-lg border border-yellow-600/50">
              <Button
                onClick={() => setIsManualMode(false)}
                size="sm"
                variant={!isManualMode ? "default" : "ghost"}
                className={!isManualMode ? "bg-yellow-600 hover:bg-yellow-700" : "text-gray-400"}
              >
                <Zap className="w-3 h-3 mr-1" />
                Auto
              </Button>
              <Button
                onClick={() => setIsManualMode(true)}
                size="sm"
                variant={isManualMode ? "default" : "ghost"}
                className={isManualMode ? "bg-yellow-600 hover:bg-yellow-700" : "text-gray-400"}
              >
                <Hand className="w-3 h-3 mr-1" />
                Manual
              </Button>
            </div>

            {!isPlaying ? (
              <Button
                onClick={handleStart}
                size="sm"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-900/50"
              >
                <Play className="w-3 h-3 mr-1" />
                Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="sm"
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-950 bg-transparent"
              >
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
            )}
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="border-yellow-600 text-yellow-400 hover:bg-yellow-950 bg-transparent"
            >
              <Settings className="w-3 h-3 mr-1" />
              Change
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex items-center justify-center relative">
        <MoveHistory history={moveHistory} />

        {isManualMode && isPlaying && !gameState.gameOver && gameState.stage !== "showdown" && (
          <div className={`absolute z-50 ${currentPlayer.id === "agent-1" ? "top-4 left-4" : "bottom-4 left-4"}`}>
            <ManualControls
              currentPlayerName={currentPlayer.name}
              currentBet={gameState.currentBet}
              playerBet={currentPlayer.currentBet}
              playerTokens={currentPlayer.tokens}
              canCheck={canCheck}
              onAction={handleManualAction}
            />
          </div>
        )}

        <PokerTableSimple
          player1={player1}
          player2={player2}
          pot={gameState.pot}
          communityCards={gameState.communityCards}
          stage={gameState.stage}
          winner={gameState.winner}
          currentPlayerIndex={gameState.currentPlayerIndex}
          player1Thinking={player1Thinking}
          player2Thinking={player2Thinking}
          actionLog={actionLog}
          currentAction={currentAction}
          isDealingCards={isDealingCards}
        />
      </div>
    </div>
  )
}
