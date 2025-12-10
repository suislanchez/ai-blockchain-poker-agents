"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { X, Brain } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlayerProfile {
  xHandle: string
  profileImage: string
  name: string
  aiModel: string // Added AI model selection
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
      aiModel: player1Model, // Include AI model
    }

    const player2: PlayerProfile = {
      xHandle: player2Handle,
      name: `@${player2Handle}`,
      profileImage: getProfileImage(player2Handle),
      aiModel: player2Model, // Include AI model
    }

    onStartGame(player1, player2)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full bg-gray-900/95 border-red-900 p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-red-900/30">
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

        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-yellow-600/30">
          <p className="text-xs text-gray-400 text-center">
            Choose X usernames and AI models for each agent. Different models have unique playing styles and strategies.
          </p>
        </div>
      </Card>
    </div>
  )
}
