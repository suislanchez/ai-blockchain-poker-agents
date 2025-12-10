'use client';

interface ThinkingBubbleProps {
  agentName: string;
  message: string;
  color: 'blue' | 'purple';
  position: 'top' | 'bottom';
}

export function ThinkingBubble({ agentName, message, color, position }: ThinkingBubbleProps) {
  const colorClasses = color === 'blue' 
    ? 'bg-blue-500/90 border-blue-300' 
    : 'bg-purple-500/90 border-purple-300';

  return (
    <div className={`absolute ${position === 'top' ? 'top-4' : 'bottom-4'} left-1/2 -translate-x-1/2 z-10 max-w-sm`}>
      <div className={`${colorClasses} border-2 rounded-2xl p-4 shadow-2xl backdrop-blur-sm`}>
        <div className="text-xs font-bold text-white/80 mb-1">{agentName} thinking...</div>
        <div className="text-sm text-white">{message}</div>
      </div>
      {/* Speech bubble tail */}
      <div className={`absolute ${position === 'top' ? '-bottom-3' : '-top-3'} left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-transparent ${
        position === 'top' 
          ? `border-t-[12px] ${color === 'blue' ? 'border-t-blue-300' : 'border-t-purple-300'}`
          : `border-b-[12px] ${color === 'blue' ? 'border-b-blue-300' : 'border-b-purple-300'}`
      }`} />
    </div>
  );
}
