# AI Poker Arena

**Watch autonomous AI agents battle at Texas Hold'em poker with blockchain-based token economics**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Play%20Now-brightgreen?style=for-the-badge)](https://vercel.com/suislanchezs-projects/v0-ai-poker-agents)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

---

## Overview

AI Poker Arena is an interactive web application where you can watch AI agents powered by leading language models compete against each other in Texas Hold'em poker. Each agent analyzes game state, calculates pot odds, evaluates hand strength, and makes strategic decisions in real-time—with visible "thinking" bubbles showing their reasoning process.

The platform features a mock blockchain token system (x402) that tracks all bets, winnings, and optional web research costs, simulating how AI agents might interact with decentralized payment systems in the future.

---

## Features

### AI Model Selection
Choose from 6 different AI models for each agent:
- **GPT-5.1** (OpenAI)
- **Claude Opus 4.5** (Anthropic)
- **Claude Sonnet 4.5** (Anthropic)
- **Grok 3** (xAI)
- **Gemini Pro** (Google)
- **Llama 3.3 70B** (Meta)

### X (Twitter) Profile Integration
- Link any X username to each AI agent
- Automatic profile picture fetching
- Display handles during gameplay (e.g., @elonmusk vs @naval)

### Real-Time AI Reasoning
- Watch AI agents "think" through their decisions
- See hand analysis, pot odds calculations, and strategic considerations
- Streaming text animation for immersive experience

### Blockchain Token System
- **x402 Token**: Mock ERC-20 token for all transactions
- Transaction logging for bets, blinds, research fees, and winnings
- Block mining simulation with transaction batching
- Full balance tracking and statistics

### Web Research Capability
- AI agents can optionally pay tokens to perform web research
- Research results influence betting decisions
- Adds a unique economic dimension to gameplay

### Game Modes
- **Auto Mode**: Watch AI agents play autonomously
- **Manual Mode**: Take control and make decisions yourself
- Pause/Resume functionality
- Start new rounds or reconfigure agents at any time

### Complete Poker Engine
- Full Texas Hold'em rules implementation
- All betting rounds: Pre-flop, Flop, Turn, River, Showdown
- Support for Check, Call, Raise, Fold, and All-In actions
- Accurate hand evaluation from High Card to Royal Flush

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | Radix UI |
| Icons | Lucide React |
| State | React Hooks |
| Deployment | Vercel |

---

## Architecture

```
ai-blockchain-poker-agents/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main game page
│   ├── layout.tsx         # Root layout
│   └── api/research/      # Web research API endpoint
├── components/            # React components
│   ├── poker-table-simple.tsx    # Main poker table UI
│   ├── profile-config.tsx        # Agent configuration
│   ├── player-panel.tsx          # Player info display
│   ├── thinking-bubble.tsx       # AI reasoning display
│   ├── poker-card.tsx            # Card component
│   ├── manual-controls.tsx       # Manual play controls
│   └── move-history.tsx          # Game history log
├── lib/
│   ├── ai/
│   │   └── agent.ts              # AI decision engine
│   ├── poker/
│   │   ├── game-engine.ts        # Core poker logic
│   │   ├── hand-evaluator.ts     # Hand ranking system
│   │   ├── deck.ts               # Card deck management
│   │   └── types.ts              # TypeScript definitions
│   └── blockchain/
│       ├── mock-blockchain.ts    # Simulated blockchain
│       └── token-system.ts       # x402 token management
└── public/                # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/suislanchez/ai-blockchain-poker-agents.git

# Navigate to project directory
cd ai-blockchain-poker-agents

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## How It Works

### 1. Agent Configuration
Select X usernames and AI models for both agents. The profile images are fetched automatically.

### 2. Game Initialization
Each agent starts with 1,000 x402 tokens. Blinds are posted (10/20) and hole cards are dealt.

### 3. AI Decision Making
On each turn, the active agent:
- Analyzes hand strength using combinatorial evaluation
- Calculates pot odds and stack-to-pot ratios
- Considers opponent behavior and betting patterns
- Optionally performs web research (costs 50 tokens)
- Makes a strategic decision (check, call, raise, fold, or all-in)

### 4. Blockchain Recording
Every transaction (blinds, bets, research fees, winnings) is recorded on the mock blockchain with unique transaction IDs.

### 5. Showdown
At showdown, hands are compared using standard poker rankings. The winner receives the pot, and tokens are transferred accordingly.

---

## Screenshots

The application features:
- Dark casino-themed UI with gradient accents
- Animated card dealing effects
- Real-time thinking bubbles with streaming text
- Responsive design for desktop and mobile

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- Built with [v0.app](https://v0.app) by Vercel
- Deployed on [Vercel](https://vercel.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
