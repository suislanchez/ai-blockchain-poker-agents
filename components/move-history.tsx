'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface MoveEntry {
  player: string;
  action: string;
  thinking: string;
  timestamp: Date;
}

interface MoveHistoryProps {
  history: MoveEntry[];
}

export function MoveHistory({ history }: MoveHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 font-semibold z-50 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Move History ({history.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden border-4 border-slate-700">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Complete Move History</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
              {history.length === 0 ? (
                <div className="text-center text-slate-400 py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-lg">No moves yet. Start a game to see history!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((entry, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-5 border-2 ${
                        entry.player.includes('Alpha')
                          ? 'bg-blue-900/40 border-blue-500/50'
                          : 'bg-purple-900/40 border-purple-500/50'
                      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                          entry.player.includes('Alpha') ? 'bg-blue-600' : 'bg-purple-600'
                        } flex-shrink-0`}>
                          {entry.player.includes('Alpha') ? '🔵' : '🟣'}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-bold text-lg ${
                              entry.player.includes('Alpha') ? 'text-blue-300' : 'text-purple-300'
                            }`}>
                              {entry.player}
                            </h3>
                            <span className="text-slate-400 text-sm">
                              Move #{i + 1}
                            </span>
                          </div>
                          
                          <div className="bg-slate-800/60 rounded-lg px-4 py-2 mb-3 border border-slate-700">
                            <span className="text-amber-300 font-bold text-lg uppercase">
                              {entry.action}
                            </span>
                          </div>
                          
                          <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                            <div className="text-sm text-slate-300 font-semibold mb-2 flex items-center gap-2">
                              <span className="text-yellow-400">💭</span>
                              Thought Process:
                            </div>
                            <div className="text-slate-200 text-sm leading-relaxed pl-6">
                              {entry.thinking.split('. ').map((sentence, idx) => {
                                if (!sentence.trim()) return null;
                                
                                // Highlight key phrases
                                let formattedSentence = sentence;
                                const highlights = [
                                  { pattern: /(\d+) x402/g, class: 'text-green-300 font-bold' },
                                  { pattern: /(rank \d+\/10)/g, class: 'text-orange-300 font-semibold' },
                                  { pattern: /(\d+%)/g, class: 'text-cyan-300 font-semibold' },
                                  { pattern: /(Looking at my hand|Community cards|Current hand strength|Pot odds|My stack|Research insight|Opponent has)/g, class: 'text-yellow-300 font-semibold' },
                                ];
                                
                                return (
                                  <div key={idx} className="mb-2 flex items-start gap-2">
                                    <span className="text-slate-500 text-xs mt-1">•</span>
                                    <span>{sentence}.</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
