"use client"

import { Button } from "@/components/ui/button"
import type { Action } from "@/lib/poker/types"

interface ManualControlsProps {
  currentPlayerName: string
  currentBet: number
  playerBet: number
  playerTokens: number
  canCheck: boolean
  onAction: (action: Action) => void
}

export function ManualControls({
  currentPlayerName,
  currentBet,
  playerBet,
  playerTokens,
  canCheck,
  onAction,
}: ManualControlsProps) {
  const callAmount = currentBet - playerBet
  const minRaise = 50

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md rounded-lg p-3 shadow-xl border border-yellow-500/50">
      <div className="text-center mb-2">
        <div className="text-yellow-300 text-xs font-bold uppercase tracking-wider">{currentPlayerName}'s Turn</div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {canCheck ? (
          <Button
            onClick={() => onAction({ type: "check" })}
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs h-8"
            size="sm"
          >
            CHECK
          </Button>
        ) : (
          <Button
            onClick={() => onAction({ type: "call" })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8"
            size="sm"
            disabled={callAmount > playerTokens}
          >
            CALL {callAmount}
          </Button>
        )}

        <Button
          onClick={() => onAction({ type: "raise", amount: minRaise })}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs h-8"
          size="sm"
          disabled={playerTokens < callAmount + minRaise}
        >
          RAISE {minRaise}
        </Button>

        <Button
          onClick={() => onAction({ type: "fold" })}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-8"
          size="sm"
        >
          FOLD
        </Button>

        <Button
          onClick={() => onAction({ type: "all-in" })}
          className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-white font-bold text-xs h-8"
          size="sm"
          disabled={playerTokens === 0}
        >
          ALL IN
        </Button>
      </div>
    </div>
  )
}
