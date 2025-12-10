export function PokerChip({ value, size = 'md' }: { value: number; size?: 'small' | 'medium' | 'lg' }) {
  let colorClasses = '';
  if (value >= 100) {
    colorClasses = 'bg-gradient-to-br from-gray-800 to-gray-950 border-gray-600'; // Black
  } else if (value >= 25) {
    colorClasses = 'bg-gradient-to-br from-green-600 to-green-800 border-green-400'; // Green
  } else if (value >= 10) {
    colorClasses = 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400'; // Blue
  } else {
    colorClasses = 'bg-gradient-to-br from-red-600 to-red-800 border-red-400'; // Red
  }

  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-[6px]'
  };

  const textSizeClasses = {
    small: 'text-[10px]',
    medium: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full ${colorClasses} flex items-center justify-center shadow-lg transition-transform hover:scale-110 animate-in zoom-in duration-300`}>
      <div className="absolute inset-2 rounded-full border-2 border-white/30" />
      <span className={`${textSizeClasses[size]} font-bold relative z-10 text-white drop-shadow`}>{value}</span>
    </div>
  );
}
