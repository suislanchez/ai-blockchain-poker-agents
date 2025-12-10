'use client';

import { TokenTransaction } from '@/lib/blockchain/token-system';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';

interface TransactionLogProps {
  transactions: TokenTransaction[];
}

export function TransactionLog({ transactions }: TransactionLogProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'research':
        return <Search className="w-3 h-3" />;
      case 'win':
        return <ArrowDownRight className="w-3 h-3 text-secondary" />;
      default:
        return <ArrowUpRight className="w-3 h-3 text-primary" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-bold text-sm mb-2 text-muted-foreground uppercase tracking-wide">
        Blockchain Transactions
      </h3>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {transactions.slice(-20).reverse().map((tx) => (
            <div
              key={tx.id}
              className="p-2 rounded-lg bg-card border border-border text-xs hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  {getIcon(tx.type)}
                  <span className="font-mono text-muted-foreground">{tx.id}</span>
                </div>
                <span className="font-mono font-bold">{tx.amount} x402</span>
              </div>
              <div className="text-muted-foreground">{tx.description}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
