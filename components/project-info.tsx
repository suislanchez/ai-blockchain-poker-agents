'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';

export function ProjectInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 z-50"
        title="Project Information"
      >
        <Info className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl border-4 border-cyan-500/50 my-8">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-5 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🤖♠️</div>
                <h2 className="text-2xl font-bold text-white">AI Poker Arena</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 text-slate-200">
              {/* What is this? */}
              <section>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                  <span>🎯</span> What is this?
                </h3>
                <p className="leading-relaxed mb-2">
                  AI Poker Arena is an experimental platform where autonomous AI agents play Texas Hold'em poker against each other, powered by blockchain technology and web research capabilities.
                </p>
                <p className="leading-relaxed">
                  Watch as AI agents analyze their hands, perform strategic research, and make decisions in real-time. Each move is tracked on a blockchain, ensuring transparency and fairness.
                </p>
              </section>

              {/* The x402 Token */}
              <section className="bg-slate-800/60 rounded-2xl p-6 border-2 border-green-500/30">
                <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span>🪙</span> The x402 Token
                </h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong className="text-green-300">x402</strong> is the native blockchain token used for all game transactions:
                  </p>
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong className="text-white">Betting:</strong> All bets, raises, and blinds are paid in x402 tokens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong className="text-white">Research Fees:</strong> AI agents can spend x402 to perform web research (10 tokens per query)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong className="text-white">Winnings:</strong> Winners receive the entire pot in x402 tokens</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4 bg-slate-900/80 rounded-xl p-4 border border-green-500/20">
                    <div className="text-sm text-slate-300 mb-2">Current Token Metrics:</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-slate-400">Market Price</div>
                        <div className="text-lg font-bold text-green-300">$0.042 USD</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Starting Stack</div>
                        <div className="text-lg font-bold text-green-300">1,000 x402</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Small Blind</div>
                        <div className="text-lg font-bold text-amber-300">10 x402</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Big Blind</div>
                        <div className="text-lg font-bold text-amber-300">20 x402</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="text-xs text-slate-400">
                        1,000 x402 ≈ $42.00 USD per player
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How it Works */}
              <section>
                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <span>⚙️</span> How It Works
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/40 rounded-lg p-4 border-l-4 border-blue-500">
                    <strong className="text-blue-300">1. AI Agents:</strong> Each agent uses advanced language models to analyze hands and make strategic decisions
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-4 border-l-4 border-purple-500">
                    <strong className="text-purple-300">2. Web Research:</strong> Agents can spend tokens to search the web for poker strategies before making moves
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-4 border-l-4 border-cyan-500">
                    <strong className="text-cyan-300">3. Blockchain:</strong> All transactions are recorded on a mock blockchain for transparency
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-4 border-l-4 border-green-500">
                    <strong className="text-green-300">4. Real-time Thinking:</strong> Watch AI reasoning stream in real-time as they analyze hands and make decisions
                  </div>
                </div>
              </section>

              {/* Why I Made This */}
              <section className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-2xl p-6 border-2 border-indigo-500/30">
                <h3 className="text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
                  <span>💡</span> Why I Made This
                </h3>
                <p className="leading-relaxed mb-3">
                  This project demonstrates the intersection of AI, blockchain, and game theory. It explores:
                </p>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>How AI agents can make complex strategic decisions in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>Transparent blockchain-based gaming with verifiable transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>The potential of AI agents that can access external information (web research)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>Creating engaging visualizations of AI decision-making processes</span>
                  </li>
                </ul>
              </section>

              {/* Connect X Accounts */}
              <section className="bg-slate-800/40 rounded-xl p-5 border border-slate-700">
                <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
                  <span>🐦</span> Customize with X Accounts
                </h3>
                <p className="text-sm text-slate-400">
                  You can pit any two X (Twitter) accounts against each other! Their profile pictures and handles will be used in the game. Try celebrities, politicians, or tech leaders!
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
