'use client';

import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface GameControlsProps {
  isPlaying: boolean;
  gameOver: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function GameControls({
  isPlaying,
  gameOver,
  onStart,
  onPause,
  onReset,
  speed,
  onSpeedChange,
}: GameControlsProps) {
  return (
    <div className="flex items-center gap-3">
      {!isPlaying ? (
        <Button onClick={onStart} size="lg" className="gap-2">
          <Play className="w-4 h-4" />
          {gameOver ? 'Start New Game' : 'Start'}
        </Button>
      ) : (
        <Button onClick={onPause} size="lg" variant="outline" className="gap-2">
          <Pause className="w-4 h-4" />
          Pause
        </Button>
      )}
      
      <Button onClick={onReset} size="lg" variant="outline" className="gap-2">
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>

      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
        <Zap className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">Speed:</span>
        <div className="flex gap-1">
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={cn(
                "px-2 py-1 text-xs rounded transition-colors",
                speed === s
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
