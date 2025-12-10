// Mock blockchain for demonstration
// In production, this would interface with a real ERC-20 smart contract

export interface BlockchainConfig {
  tokenName: string;
  tokenSymbol: string;
  decimals: number;
  network: string;
}

export const X402_TOKEN_CONFIG: BlockchainConfig = {
  tokenName: 'X402 Token',
  tokenSymbol: 'x402',
  decimals: 0, // Whole tokens only for simplicity
  network: 'Mock Testnet',
};

export interface Block {
  blockNumber: number;
  timestamp: number;
  transactions: string[];
  previousHash: string;
  hash: string;
}

class MockBlockchain {
  private blocks: Block[];
  private pendingTransactions: string[];

  constructor() {
    this.blocks = [];
    this.pendingTransactions = [];
    
    // Genesis block
    this.blocks.push({
      blockNumber: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0x0',
      hash: this.generateHash('genesis'),
    });
  }

  // Add transaction to pending pool
  addTransaction(txId: string): void {
    this.pendingTransactions.push(txId);
    
    // Auto-mine when we have 5 transactions (simplified)
    if (this.pendingTransactions.length >= 5) {
      this.mineBlock();
    }
  }

  // Mine a new block
  mineBlock(): Block | null {
    if (this.pendingTransactions.length === 0) {
      return null;
    }

    const lastBlock = this.blocks[this.blocks.length - 1];
    const newBlock: Block = {
      blockNumber: lastBlock.blockNumber + 1,
      timestamp: Date.now(),
      transactions: [...this.pendingTransactions],
      previousHash: lastBlock.hash,
      hash: this.generateHash(`block_${lastBlock.blockNumber + 1}_${Date.now()}`),
    };

    this.blocks.push(newBlock);
    this.pendingTransactions = [];
    
    return newBlock;
  }

  // Get blockchain info
  getBlockchainInfo() {
    return {
      blockHeight: this.blocks.length - 1,
      totalBlocks: this.blocks.length,
      pendingTransactions: this.pendingTransactions.length,
      latestBlock: this.blocks[this.blocks.length - 1],
    };
  }

  // Get all blocks
  getBlocks(): Block[] {
    return [...this.blocks];
  }

  // Simple hash function (in real blockchain, would use SHA-256)
  private generateHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
  }
}

// Singleton instance
let blockchainInstance: MockBlockchain | null = null;

export function getBlockchain(): MockBlockchain {
  if (!blockchainInstance) {
    blockchainInstance = new MockBlockchain();
  }
  return blockchainInstance;
}

export function resetBlockchain(): void {
  blockchainInstance = new MockBlockchain();
}
