'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

export interface ChatMessage {
  agentId: string;
  agentName: string;
  message: string;
  timestamp: number;
  action?: string;
  amount?: number;
  research?: boolean;
}

interface AgentChatProps {
  messages: ChatMessage[];
  agents: { id: string; name: string; color: string }[];
}

export function AgentChat({ messages, agents }: AgentChatProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-4">
        {messages.map((msg, idx) => {
          const isAlpha = msg.agentId === 'agent-1';
          
          return (
            <div
              key={idx}
              className={`flex gap-3 ${isAlpha ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                isAlpha ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {msg.agentName.charAt(0)}
              </div>
              
              {/* Message bubble */}
              <div className={`flex-1 max-w-[80%] ${isAlpha ? '' : 'text-right'}`}>
                <div className={`text-xs mb-1 font-medium ${
                  isAlpha ? 'text-blue-400' : 'text-purple-400'
                }`}>
                  {msg.agentName}
                </div>
                <div className={`inline-block p-3 rounded-2xl ${
                  isAlpha
                    ? 'bg-blue-500/10 border border-blue-500/30' 
                    : 'bg-purple-500/10 border border-purple-500/30'
                }`}>
                  <div className="text-sm mb-1 text-white">{msg.message}</div>
                  {msg.action && (
                    <div className={`text-xs font-mono mt-2 pt-2 border-t ${
                      isAlpha ? 'border-blue-500/20' : 'border-purple-500/20'
                    }`}>
                      <span className="font-bold text-accent">{msg.action.toUpperCase()}</span>
                      {msg.amount !== undefined && <span className="text-slate-300"> {msg.amount} x402</span>}
                      {msg.research && <span className="ml-2 text-green-400">🔍 web research</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
