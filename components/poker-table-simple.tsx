import type { Player, Card } from "@/lib/poker/types"
import { PokerCard } from "@/components/poker-card"
import { PokerChip } from "@/components/poker-chip"
import { FormattedThinking } from "@/components/formatted-thinking"
import { DealerAvatar } from "@/components/dealer-avatar"

interface PokerTableSimpleProps {
  player1: Player
  player2: Player
  pot: number
  communityCards: Card[]
  stage: string
  winner: string | null
  currentPlayerIndex: number
  player1Thinking: string
  player2Thinking: string
  actionLog: string[]
  currentAction: string
  isDealingCards?: boolean
}

export function PokerTableSimple({
  player1,
  player2,
  pot,
  communityCards,
  stage,
  winner,
  currentPlayerIndex,
  player1Thinking,
  player2Thinking,
  actionLog,
  currentAction,
  isDealingCards = false,
}: PokerTableSimpleProps) {
  const isPlayer1Turn = currentPlayerIndex === 0
  const winnerPlayer = winner ? (winner === player1.name ? player1 : player2) : null

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto] gap-2 p-2 max-w-6xl mx-auto relative">
      {currentAction && !winner && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-40 animate-in zoom-in-50 fade-in duration-300">
          <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 text-white px-6 py-2 rounded-xl shadow-2xl border-2 border-yellow-400">
            <div className="text-xl font-bold uppercase tracking-wider drop-shadow-lg">{currentAction}</div>
          </div>
        </div>
      )}

      {player1Thinking && !winner && (
        <div className="absolute top-28 left-4 z-50 w-64 max-h-[25vh] animate-in fade-in zoom-in-95 duration-300">
          <div className="relative bg-blue-900/40 backdrop-blur-lg text-white px-3 py-2 rounded-xl shadow-xl shadow-blue-900/60 border border-blue-400/50">
            <div className="absolute left-6 -top-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-blue-900/40" />
            <div className="text-xs font-bold text-blue-100 uppercase tracking-wide mb-1 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
              {player1.name}
            </div>
            <div className="max-h-[22vh] overflow-y-auto custom-scrollbar text-xs leading-relaxed">
              <FormattedThinking text={player1Thinking} speed={15} className="text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Added backdrop-blur to player cards */}
      <div className="flex items-center gap-3 justify-center">
        <div
          className={`bg-gradient-to-br from-blue-700/90 to-blue-900/90 backdrop-blur-sm rounded-xl p-3 shadow-xl shadow-blue-900/50 border-2 ${isPlayer1Turn ? "border-yellow-400 ring-2 ring-yellow-400/50" : "border-blue-500"} transition-all duration-300 flex items-center gap-3`}
        >
          <img
            src={
              player1.xHandle
                ? `https://unavatar.io/twitter/${player1.xHandle}`
                : player1.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player1.name}`
            }
            alt={player1.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${player1.name}`
            }}
          />
          <div>
            <h3 className="text-white font-bold text-sm">{player1.name}</h3>
            <div className="flex items-center gap-1">
              <PokerChip value={player1.tokens} size="small" />
              <span className="text-lg font-bold text-white">{player1.tokens}</span>
            </div>
          </div>
          <div className="flex gap-1">
            {player1.hand.map((card, i) => (
              <PokerCard key={i} card={card} size="sm" />
            ))}
          </div>
          {player1.folded && <span className="text-xs bg-red-500 px-2 py-0.5 rounded">FOLD</span>}
          {player1.isAllIn && <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">ALL IN</span>}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-green-800 via-green-900 to-green-950 rounded-[60px] border-8 border-red-900 shadow-2xl shadow-red-900/50 p-6 flex flex-col items-center justify-center">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 scale-75">
          <DealerAvatar />
        </div>

        {/* Added backdrop-blur to pot */}
        <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl border-2 border-yellow-500 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 text-xs font-semibold uppercase">Pot</span>
            <PokerChip value={pot} size="small" />
            <span className="text-2xl font-bold text-yellow-400">{pot}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-center mb-2">
            <span className="text-yellow-300 text-xs font-semibold uppercase tracking-wider bg-black/50 px-3 py-0.5 rounded-full border border-yellow-600">
              {stage === "pre-flop"
                ? "Pre-Flop"
                : stage === "flop"
                  ? "Flop"
                  : stage === "turn"
                    ? "Turn"
                    : stage === "river"
                      ? "River"
                      : "Showdown"}
            </span>
          </div>
          <div className="flex gap-2 justify-center min-h-[80px] items-center">
            {communityCards.length > 0 ? (
              communityCards.map((card, i) => (
                <PokerCard
                  key={i}
                  card={card}
                  size="sm"
                  animate={true}
                  animationType="slide"
                  animationDelay={i * 150}
                />
              ))
            ) : (
              <div className="text-green-300/50 text-sm italic">Dealing...</div>
            )}
          </div>
        </div>

        {winner && winnerPlayer && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/85 backdrop-blur-md rounded-[52px] z-50">
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-red-500 text-black px-8 py-6 rounded-2xl shadow-2xl shadow-red-900 text-center animate-in zoom-in duration-700 border-4 border-yellow-300">
              <div className="text-4xl mb-2">🏆</div>
              <img
                src={
                  winnerPlayer.xHandle
                    ? `https://unavatar.io/twitter/${winnerPlayer.xHandle}`
                    : winnerPlayer.profileImage ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${winnerPlayer.name}`
                }
                alt={winner}
                className="w-20 h-20 rounded-full border-4 border-white shadow-2xl mx-auto mb-2 object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${winnerPlayer.name}`
                }}
              />
              <div className="text-2xl font-black mb-1 drop-shadow-lg">WINNER!</div>
              <div className="text-xl font-bold mb-2 drop-shadow">{winner}</div>
              <div className="text-base font-semibold opacity-80 mb-2">Won {pot} chips</div>
              <div className="mt-2 text-xs bg-black/30 px-3 py-1 rounded-full font-medium">
                Click "Start" to play again
              </div>
            </div>
          </div>
        )}

        {/* Added backdrop-blur to action log */}
        {!winner && (
          <div className="bg-black/70 backdrop-blur-md rounded-lg px-4 py-2 max-w-xl border border-yellow-700/50">
            <div className="text-center mb-0.5">
              <span className="text-yellow-300 text-xs font-semibold uppercase tracking-wider">Actions</span>
            </div>
            <div className="space-y-0.5">
              {actionLog.slice(-2).map((log, i) => (
                <div key={i} className="text-white/90 text-xs text-center font-medium">
                  {log}
                </div>
              ))}
              {actionLog.length === 0 && <div className="text-gray-500 text-xs text-center italic">Starting...</div>}
            </div>
          </div>
        )}
      </div>

      {player2Thinking && !winner && (
        <div className="absolute bottom-28 left-4 z-50 w-64 max-h-[25vh] animate-in fade-in zoom-in-95 duration-300">
          <div className="relative bg-purple-900/40 backdrop-blur-lg text-white px-3 py-2 rounded-xl shadow-xl shadow-purple-900/60 border border-purple-400/50">
            <div className="absolute left-6 -bottom-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-900/40" />
            <div className="text-xs font-bold text-purple-100 uppercase tracking-wide mb-1 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse"></div>
              {player2.name}
            </div>
            <div className="max-h-[22vh] overflow-y-auto custom-scrollbar text-xs leading-relaxed">
              <FormattedThinking text={player2Thinking} speed={15} className="text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Added backdrop-blur to player cards */}
      <div className="flex items-center gap-3 justify-center">
        <div
          className={`bg-gradient-to-br from-purple-700/90 to-purple-900/90 backdrop-blur-sm rounded-xl p-3 shadow-xl shadow-purple-900/50 border-2 ${!isPlayer1Turn ? "border-yellow-400 ring-2 ring-yellow-400/50" : "border-purple-500"} transition-all duration-300 flex items-center gap-3`}
        >
          <img
            src={
              player2.xHandle
                ? `https://unavatar.io/twitter/${player2.xHandle}`
                : player2.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player2.name}`
            }
            alt={player2.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${player2.name}`
            }}
          />
          <div>
            <h3 className="text-white font-bold text-sm">{player2.name}</h3>
            <div className="flex items-center gap-1">
              <PokerChip value={player2.tokens} size="small" />
              <span className="text-lg font-bold text-white">{player2.tokens}</span>
            </div>
          </div>
          <div className="flex gap-1">
            {player2.hand.map((card, i) => (
              <PokerCard key={i} card={card} size="sm" animate={true} animationType="slide" animationDelay={i * 100} />
            ))}
          </div>
          {player2.folded && <span className="text-xs bg-red-500 px-2 py-0.5 rounded">FOLD</span>}
          {player2.isAllIn && <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">ALL IN</span>}
        </div>
      </div>
    </div>
  )
}
