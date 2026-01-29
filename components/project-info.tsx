'use client';

import { useState } from 'react';
import { X, Info, Github, Globe, Brain, Blocks, Gamepad2, Eye, Star } from 'lucide-react';

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
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/suislanchez/ai-blockchain-poker-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  title="View on GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
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

              {/* Platform Features */}
              <section className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-2xl p-6 border-2 border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <span>⚡</span> Platform Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                    <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <div className="text-2xl font-bold text-white">6</div>
                    <div className="text-xs text-slate-400">AI Models</div>
                    <div className="text-[10px] text-purple-300 mt-1">GPT-5.1, Claude, Grok, Gemini, Llama</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                    <Eye className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                    <div className="text-2xl font-bold text-white">Live</div>
                    <div className="text-xs text-slate-400">AI Reasoning</div>
                    <div className="text-[10px] text-cyan-300 mt-1">Watch AI think in real-time</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-green-500/20 hover:border-green-400/40 transition-colors">
                    <Blocks className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <div className="text-2xl font-bold text-white">x402</div>
                    <div className="text-xs text-slate-400">Blockchain Token</div>
                    <div className="text-[10px] text-green-300 mt-1">All transactions on-chain</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-amber-500/20 hover:border-amber-400/40 transition-colors">
                    <span className="text-3xl block mb-1">♠️</span>
                    <div className="text-2xl font-bold text-white">Full</div>
                    <div className="text-xs text-slate-400">Texas Hold'em</div>
                    <div className="text-[10px] text-amber-300 mt-1">Complete poker rules</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-blue-500/20 hover:border-blue-400/40 transition-colors">
                    <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <div className="text-2xl font-bold text-white">2</div>
                    <div className="text-xs text-slate-400">Play Modes</div>
                    <div className="text-[10px] text-blue-300 mt-1">Auto watch or Manual play</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-pink-500/20 hover:border-pink-400/40 transition-colors">
                    <span className="text-3xl block mb-1">🐦</span>
                    <div className="text-2xl font-bold text-white">X</div>
                    <div className="text-xs text-slate-400">Integration</div>
                    <div className="text-[10px] text-pink-300 mt-1">Use any X profile</div>
                  </div>
                </div>
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

              {/* Created By */}
              <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border-2 border-slate-600/50">
                <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <span>👨‍💻</span> Created By
                </h3>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-3">Luis Sanchez</p>
                  <div className="flex justify-center gap-4 mb-6">
                    <a
                      href="https://x.com/iamsuislanchez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg transition-colors text-slate-300 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm">@iamsuislanchez</span>
                    </a>
                    <a
                      href="https://github.com/suislanchez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg transition-colors text-slate-300 hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">suislanchez</span>
                    </a>
                    <a
                      href="https://suislanchez.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg transition-colors text-slate-300 hover:text-white"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">suislanchez.com</span>
                    </a>
                  </div>

                  {/* Star on GitHub CTA */}
                  <a
                    href="https://github.com/suislanchez/ai-blockchain-poker-agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-yellow-900/30 transition-all hover:scale-105"
                  >
                    <Star className="w-5 h-5" />
                    <span>Star on GitHub</span>
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
