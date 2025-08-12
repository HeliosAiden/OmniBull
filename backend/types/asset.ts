export type Asset = {
  accAvgPx: string;               // Average account price
  autoLendAmt: string;            // Auto-lend amount
  autoLendMtAmt: string;          // Auto-lend margin amount
  autoLendStatus: string;         // Auto-lend status (e.g., "unsupported")
  availBal: string;               // Available balance
  availEq: string;                // Available equity
  borrowFroz: string;             // Borrow frozen amount
  cashBal: string;                // Cash balance
  ccy: string;                    // Currency code (e.g., "BTC")
  clSpotInUseAmt: string;         // Cross-level spot in-use amount
  colBorrAutoConversion: string;  // Collateral borrow auto-conversion
  collateralEnabled: boolean;     // Whether collateral is enabled
  collateralRestrict: boolean;    // Whether collateral is restricted
  crossLiab: string;              // Cross liability
  disEq: string;                  // Discounted equity
  eq: string;                     // Total equity in this currency
  eqUsd: string;                  // Equity value in USD
  fixedBal: string;               // Fixed balance
  frozenBal: string;              // Frozen balance
  imr: string;                    // Initial margin requirement
  interest: string;               // Interest
  isoEq: string;                  // Isolated equity
  isoLiab: string;                // Isolated liability
  isoUpl: string;                 // Isolated unrealized P&L
  liab: string;                   // Liability
  maxLoan: string;                // Maximum loan amount
  maxSpotInUse: string;           // Maximum spot in use
  mgnRatio: string;               // Margin ratio
  mmr: string;                    // Maintenance margin requirement
  notionalLever: string;          // Notional leverage
  openAvgPx: string;              // Average opening price
  ordFrozen: string;              // Order frozen amount
  rewardBal: string;              // Reward balance
  smtSyncEq: string;              // Smart sync equity
  spotBal: string;                // Spot balance
  spotCopyTradingEq: string;      // Spot copy trading equity
  spotInUseAmt: string;           // Spot in-use amount
  spotIsoBal: string;             // Spot isolated balance
  spotUpl: string;                // Spot unrealized P&L
  spotUplRatio: string;           // Spot unrealized P&L ratio
  stgyEq: string;                 // Strategy equity
  totalPnl: string;               // Total profit and loss
  totalPnlRatio: string;          // Total P&L ratio
  twap: string;                   // Time-weighted average price
  uTime: string;                  // Update time (Unix timestamp in milliseconds)
  upl: string;                    // Unrealized P&L
  uplLiab: string;                // Unrealized P&L liability
};

// Optional: You might also want to create a more strictly typed version
// where you convert string numbers to actual numbers where appropriate
export type TypedAsset = Omit<Asset, 
  | 'accAvgPx' | 'availBal' | 'availEq' | 'cashBal' | 'eq' | 'eqUsd' 
  | 'frozenBal' | 'imr' | 'mmr' | 'mgnRatio' | 'notionalLever'
  | 'openAvgPx' | 'spotBal' | 'spotUpl' | 'totalPnl' | 'upl'
> & {
  accAvgPx: number;
  availBal: number;
  availEq: number;
  cashBal: number;
  eq: number;
  eqUsd: number;
  frozenBal: number;
  imr: number;
  mmr: number;
  mgnRatio: number;
  notionalLever: number;
  openAvgPx: number;
  spotBal: number;
  spotUpl: number;
  totalPnl: number;
  upl: number;
  uTime: Date;  // Convert timestamp to Date object
};