export interface TokenTransaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  type: 'blind' | 'bet' | 'research' | 'win' | 'transfer';
  timestamp: number;
  description: string;
}

export interface TokenBalance {
  playerId: string;
  balance: number;
  totalWagered: number;
  totalWon: number;
  researchSpent: number;
}

export class TokenPaymentSystem {
  private balances: Map<string, TokenBalance>;
  private transactions: TokenTransaction[];
  private transactionCounter: number;

  constructor() {
    this.balances = new Map();
    this.transactions = [];
    this.transactionCounter = 0;
  }

  // Initialize a player's token balance
  initializePlayer(playerId: string, initialBalance: number): void {
    this.balances.set(playerId, {
      playerId,
      balance: initialBalance,
      totalWagered: 0,
      totalWon: 0,
      researchSpent: 0,
    });
  }

  // Get a player's current balance
  getBalance(playerId: string): number {
    const balance = this.balances.get(playerId);
    return balance ? balance.balance : 0;
  }

  // Get full balance details
  getBalanceDetails(playerId: string): TokenBalance | null {
    return this.balances.get(playerId) || null;
  }

  // Process a blind payment
  payBlind(playerId: string, amount: number, type: 'small' | 'big'): TokenTransaction | null {
    const balance = this.balances.get(playerId);
    if (!balance || balance.balance < amount) {
      return null;
    }

    balance.balance -= amount;
    balance.totalWagered += amount;

    const transaction: TokenTransaction = {
      id: `tx_${this.transactionCounter++}`,
      from: playerId,
      to: 'pot',
      amount,
      type: 'blind',
      timestamp: Date.now(),
      description: `${type === 'small' ? 'Small' : 'Big'} blind payment`,
    };

    this.transactions.push(transaction);
    return transaction;
  }

  // Process a bet/raise
  payBet(playerId: string, amount: number): TokenTransaction | null {
    const balance = this.balances.get(playerId);
    if (!balance || balance.balance < amount) {
      return null;
    }

    balance.balance -= amount;
    balance.totalWagered += amount;

    const transaction: TokenTransaction = {
      id: `tx_${this.transactionCounter++}`,
      from: playerId,
      to: 'pot',
      amount,
      type: 'bet',
      timestamp: Date.now(),
      description: 'Bet/Raise payment',
    };

    this.transactions.push(transaction);
    return transaction;
  }

  // Process a research fee
  payResearchFee(playerId: string, amount: number): TokenTransaction | null {
    const balance = this.balances.get(playerId);
    if (!balance || balance.balance < amount) {
      return null;
    }

    balance.balance -= amount;
    balance.researchSpent += amount;

    const transaction: TokenTransaction = {
      id: `tx_${this.transactionCounter++}`,
      from: playerId,
      to: 'research_pool',
      amount,
      type: 'research',
      timestamp: Date.now(),
      description: 'Web research fee',
    };

    this.transactions.push(transaction);
    return transaction;
  }

  // Award pot to winner
  awardPot(playerId: string, amount: number): TokenTransaction {
    const balance = this.balances.get(playerId);
    if (balance) {
      balance.balance += amount;
      balance.totalWon += amount;
    }

    const transaction: TokenTransaction = {
      id: `tx_${this.transactionCounter++}`,
      from: 'pot',
      to: playerId,
      amount,
      type: 'win',
      timestamp: Date.now(),
      description: 'Pot winnings',
    };

    this.transactions.push(transaction);
    return transaction;
  }

  // Get all transactions
  getTransactions(): TokenTransaction[] {
    return [...this.transactions];
  }

  // Get transactions for a specific player
  getPlayerTransactions(playerId: string): TokenTransaction[] {
    return this.transactions.filter(
      tx => tx.from === playerId || tx.to === playerId
    );
  }

  // Get recent transactions (last N)
  getRecentTransactions(count: number = 10): TokenTransaction[] {
    return this.transactions.slice(-count);
  }

  // Get transaction by ID
  getTransaction(txId: string): TokenTransaction | null {
    return this.transactions.find(tx => tx.id === txId) || null;
  }

  // Calculate total x402 tokens in circulation
  getTotalSupply(): number {
    let total = 0;
    this.balances.forEach(balance => {
      total += balance.balance;
    });
    return total;
  }

  // Get statistics
  getStatistics() {
    const players = Array.from(this.balances.values());
    const totalWagered = players.reduce((sum, p) => sum + p.totalWagered, 0);
    const totalResearchSpent = players.reduce((sum, p) => sum + p.researchSpent, 0);
    const totalSupply = this.getTotalSupply();

    return {
      totalSupply,
      totalWagered,
      totalResearchSpent,
      totalTransactions: this.transactions.length,
      players: players.length,
    };
  }

  // Export blockchain state (for future real blockchain integration)
  exportState() {
    return {
      balances: Array.from(this.balances.entries()),
      transactions: this.transactions,
      timestamp: Date.now(),
    };
  }

  // Import blockchain state
  importState(state: any) {
    this.balances = new Map(state.balances);
    this.transactions = state.transactions;
    this.transactionCounter = this.transactions.length;
  }
}

// Singleton instance for the payment system
let paymentSystemInstance: TokenPaymentSystem | null = null;

export function getPaymentSystem(): TokenPaymentSystem {
  if (!paymentSystemInstance) {
    paymentSystemInstance = new TokenPaymentSystem();
  }
  return paymentSystemInstance;
}

export function resetPaymentSystem(): void {
  paymentSystemInstance = new TokenPaymentSystem();
}
