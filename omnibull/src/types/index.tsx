export interface TokenBalance {
  symbol: string;
  name: string;
  decimals: number;
  contractAddress: string;
  raw: string;
  formatted: string;
  usdValue?: number;
}
