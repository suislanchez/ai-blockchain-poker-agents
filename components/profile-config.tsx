"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { X, Brain, Github, Globe, Star, Eye, Blocks, Gamepad2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlayerProfile {
  xHandle: string
  profileImage: string
  name: string
  aiModel: string
}

interface ProfileConfigProps {
  onStartGame: (player1: PlayerProfile, player2: PlayerProfile) => void
}

const AI_MODELS = [
  { id: "openai/gpt-5.1", name: "GPT-5.1", provider: "OpenAI" },
  { id: "anthropic/claude-opus-4.5", name: "Claude Opus 4.5", provider: "Anthropic" },
  { id: "anthropic/claude-sonnet-4.5", name: "Claude Sonnet 4.5", provider: "Anthropic" },
  { id: "xai/grok-3", name: "Grok 3", provider: "xAI" },
  { id: "google/gemini-2.0-flash-exp", name: "Gemini Pro", provider: "Google" },
  { id: "meta/llama-3.3-70b", name: "Llama 3.3 70B", provider: "Meta" },
]

export function ProfileConfig({ onStartGame }: ProfileConfigProps) {
  const [player1Handle, setPlayer1Handle] = useState("elonmusk")
  const [player2Handle, setPlayer2Handle] = useState("naval")
  const [player1Model, setPlayer1Model] = useState("anthropic/claude-sonnet-4.5")
  const [player2Model, setPlayer2Model] = useState("openai/gpt-5.1")

  const getProfileImage = (handle: string) => {
    return `https://unavatar.io/x/${handle}`
  }

  const handleStart = () => {
    const player1: PlayerProfile = {
      xHandle: player1Handle,
      name: `@${player1Handle}`,
      profileImage: getProfileImage(player1Handle),
      aiModel: player1Model,
    }

    const player2: PlayerProfile = {
      xHandle: player2Handle,
      name: `@${player2Handle}`,
      profileImage: getProfileImage(player2Handle),
      aiModel: player2Model,
    }

    onStartGame(player1, player2)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 items-start">

        {/* Left Panel - About */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl p-5 border border-cyan-500/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <span>🎯</span> What is this?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Watch autonomous AI agents battle at Texas Hold'em poker with real-time reasoning and blockchain transactions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>6 AI Models to choose from</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Watch AI think in real-time</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Blocks className="w-4 h-4 text-green-400" />
                <span>x402 blockchain token</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Gamepad2 className="w-4 h-4 text-blue-400" />
                <span>Auto or Manual play modes</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-slate-900/90 rounded-2xl p-5 border border-green-500/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
              <span>🪙</span> x402 Token
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Starting Stack</span>
                <span className="font-bold text-green-300">1,000 x402</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Small Blind</span>
                <span className="font-bold text-amber-300">10 x402</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Big Blind</span>
                <span className="font-bold text-amber-300">20 x402</span>
              </div>
              <div className="pt-2 border-t border-slate-700 text-xs text-slate-400">
                All bets recorded on-chain
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/90 rounded-2xl p-5 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
              <span>🤖</span> AI Models
            </h3>
            <div className="space-y-1 text-xs text-slate-400">
              <div>GPT-5.1 <span className="text-slate-500">(OpenAI)</span></div>
              <div>Claude Opus 4.5 <span className="text-slate-500">(Anthropic)</span></div>
              <div>Claude Sonnet 4.5 <span className="text-slate-500">(Anthropic)</span></div>
              <div>Grok 3 <span className="text-slate-500">(xAI)</span></div>
              <div>Gemini Pro <span className="text-slate-500">(Google)</span></div>
              <div>Llama 3.3 70B <span className="text-slate-500">(Meta)</span></div>
            </div>
          </div>
        </div>

        {/* Center - Config Card */}
        <Card className="w-full bg-gray-900/95 border-red-900 p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-red-900/30">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent mb-2">
              AI Poker Arena
            </h1>
            <p className="text-gray-400 text-sm">Configure your AI agents for battle</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Player 1 */}
            <div className="space-y-4 p-4 bg-blue-950/30 rounded-lg border border-blue-600/30">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-blue-500 overflow-hidden border-4 border-blue-400 shadow-lg shadow-blue-500/50">
                  <img
                    src={getProfileImage(player1Handle) || "/placeholder.svg"}
                    alt={player1Handle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                    }}
                  />
                </div>
                <Label className="text-blue-300 font-bold text-lg">Agent Alpha</Label>
              </div>

              <div>
                <Label htmlFor="player1" className="text-gray-300 mb-2 block text-sm">
                  <X className="inline w-4 h-4 mr-1" />X Username
                </Label>
                <Input
                  id="player1"
                  value={player1Handle}
                  onChange={(e) => setPlayer1Handle(e.target.value.replace("@", ""))}
                  placeholder="Enter X handle"
                  className="bg-gray-800 border-blue-600/50 text-white"
                />
              </div>

              <div>
                <Label htmlFor="player1-model" className="text-gray-300 mb-2 block text-sm">
                  <Brain className="inline w-4 h-4 mr-1" />
                  AI Model
                </Label>
                <Select value={player1Model} onValueChange={setPlayer1Model}>
                  <SelectTrigger className="bg-gray-800 border-blue-600/50 text-white">
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-blue-600/50">
                    {AI_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="text-white hover:bg-blue-900/50">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-gray-400 ml-2">({model.provider})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Player 2 */}
            <div className="space-y-4 p-4 bg-purple-950/30 rounded-lg border border-purple-600/30">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-purple-500 overflow-hidden border-4 border-purple-400 shadow-lg shadow-purple-500/50">
                  <img
                    src={getProfileImage(player2Handle) || "/placeholder.svg"}
                    alt={player2Handle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                    }}
                  />
                </div>
                <Label className="text-purple-300 font-bold text-lg">Agent Beta</Label>
              </div>

              <div>
                <Label htmlFor="player2" className="text-gray-300 mb-2 block text-sm">
                  <X className="inline w-4 h-4 mr-1" />X Username
                </Label>
                <Input
                  id="player2"
                  value={player2Handle}
                  onChange={(e) => setPlayer2Handle(e.target.value.replace("@", ""))}
                  placeholder="Enter X handle"
                  className="bg-gray-800 border-purple-600/50 text-white"
                />
              </div>

              <div>
                <Label htmlFor="player2-model" className="text-gray-300 mb-2 block text-sm">
                  <Brain className="inline w-4 h-4 mr-1" />
                  AI Model
                </Label>
                <Select value={player2Model} onValueChange={setPlayer2Model}>
                  <SelectTrigger className="bg-gray-800 border-purple-600/50 text-white">
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-purple-600/50">
                    {AI_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="text-white hover:bg-purple-900/50">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-gray-400 ml-2">({model.provider})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleStart}
              size="lg"
              className="bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 hover:from-yellow-700 hover:via-red-700 hover:to-yellow-700 text-white px-12 shadow-lg shadow-red-900/50 font-bold"
            >
              Start Battle
            </Button>
          </div>

          {/* Mobile info - shows only on small screens */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-yellow-600/30 lg:hidden">
            <p className="text-xs text-gray-400 text-center">
              Watch AI agents battle with real-time reasoning, blockchain transactions, and 6 different AI models.
            </p>
          </div>
        </Card>

        {/* Right Panel - Credits */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl p-5 border border-indigo-500/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-indigo-400 mb-3 flex items-center gap-2">
              <span>💡</span> Why This Exists
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Exploring the intersection of AI, blockchain, and game theory. Watch how different AI models make strategic decisions under uncertainty.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl p-5 border border-slate-600/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
              <span>👨‍💻</span> Created By
            </h3>
            <p className="text-xl font-bold text-white mb-3">Luis Sanchez</p>
            <div className="space-y-2">
              <a
                href="https://x.com/iamsuislanchez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
                <span>@iamsuislanchez</span>
              </a>
              <a
                href="https://github.com/suislanchez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>suislanchez</span>
              </a>
              <a
                href="https://suislanchez.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>suislanchez.com</span>
              </a>
            </div>
          </div>

          <a
            href="https://github.com/suislanchez/ai-blockchain-poker-agents"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-yellow-900/30 transition-all hover:scale-105"
          >
            <Star className="w-5 h-5" />
            <span>Star on GitHub</span>
          </a>

          <div className="bg-gradient-to-br from-pink-900/30 to-slate-900/90 rounded-2xl p-5 border border-pink-500/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-pink-400 mb-2 flex items-center gap-2">
              <span>🐦</span> X Profiles
            </h3>
            <p className="text-xs text-slate-400">
              Pit any X accounts against each other! Try celebrities, tech leaders, or politicians.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
