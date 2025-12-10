import { Player } from '@/lib/poker/types';
import { Card } from './poker-card';
import { cn } from '@/lib/utils';

interface PlayerPanelProps {
  player: Player;
  isCurrentPlayer: boolean;
  showCards?: boolean;
  lastAction?: string;
  research?: {
    query: string;
    cost: number;
  };
}

export function PlayerPanel({ player, isCurrentPlayer, showCards = false, lastAction, research }: PlayerPanelProps) {
  return (
    <div className={cn(
      "relative p-4 rounded-xl border-2 transition-all",
      isCurrentPlayer 
        ? "bg-primary/10 border-primary shadow-lg shadow-primary/20" 
        : "bg-card border-border",
      player.folded && "opacity-50"
    )}>
      {/* Player info */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">{player.name}</h3>
          <p className="text-sm text-muted-foreground">
            {player.id}
          </p>
        </div>
        {isCurrentPlayer && (
          <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold animate-pulse">
            ACTIVE
          </div>
        )}
      </div>

      {/* Token balance */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary/20 border border-secondary/30">
          <div className="w-2 h-2 rounded-full bg-secondary token-pulse" />
          <span className="text-sm font-mono font-bold">{player.tokens}</span>
          <span className="text-xs text-muted-foreground">x402</span>
        </div>
        {player.currentBet > 0 && (
          <div className="text-xs text-muted-foreground">
            Bet: {player.currentBet}
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="flex gap-2 mb-2">
        {player.hand.map((card, i) => (
          <Card 
            key={i} 
            card={card} 
            hidden={!showCards && !player.folded} 
          />
        ))}
      </div>

      {/* Status */}
      {player.folded && (
        <div className="text-xs text-destructive font-semibold">FOLDED</div>
      )}
      {player.isAllIn && (
        <div className="text-xs text-accent font-semibold">ALL IN</div>
      )}
      {lastAction && !player.folded && (
        <div className="text-xs text-primary">{lastAction}</div>
      )}

      {/* Research indicator */}
      {research && (
        <div className="mt-2 p-2 rounded bg-accent/10 border border-accent/30">
          <div className="text-xs text-accent font-semibold flex items-center gap-1">
            <span>🔍</span>
            <span>Research: -{research.cost} x402</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {research.query}
          </div>
        </div>
      )}
    </div>
  );
}
