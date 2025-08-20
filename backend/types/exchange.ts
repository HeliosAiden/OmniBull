// backend/types/exchange.ts
export type ExchangeName = "binance" | "okx" | "bybit" | "bitget" | "bingx";

export type ExchangeKeys = {
  apiKey: string;
  secretKey: string;
  passphrase?: string;
};

export type Exchange = {
  id: string;
  name: string;
  label: string;
  status: string;
  immutable: boolean;
};