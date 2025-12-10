export function DealerAvatar() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 mb-2">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-yellow-500 shadow-2xl flex items-center justify-center">
          <div className="text-4xl">🎩</div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-xs">
          🎴
        </div>
      </div>
      <div className="bg-slate-800 px-3 py-1 rounded-full border-2 border-yellow-500">
        <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Dealer</span>
      </div>
    </div>
  );
}
