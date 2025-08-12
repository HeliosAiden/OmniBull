// /services/exchange.service.ts
import { getBinanceData } from "./exchanges/binance";
import { getOkxData } from "./exchanges/okx";
import { getBybitData } from "./exchanges/bybit";
import { getBitgetData } from "./exchanges/bitget";
import { getBingxData } from "./exchanges/bingx";
import { ExchangeKeys, ExchangeName } from "../types/exchange";

// ==============================
// Binance
// ==============================
export async function getBinanceAccountData(keys: ExchangeKeys) {
  return await getBinanceData({
    apiKey: keys.apiKey,
    secretKey: keys.secretKey
  });
}

// ==============================
// OKX
// ==============================
export async function getOKXAccountData(keys: ExchangeKeys) {
  if (!keys.passphrase) {
    throw new Error("OKX requires a passphrase");
  }
  return await getOkxData({
    apiKey: keys.apiKey,
    secretKey: keys.secretKey,
    passphrase: keys.passphrase,
  });
}

// ==============================
// Bybit
// ==============================
export async function getBybitAccountData(keys: ExchangeKeys) {
  return await getBybitData({
    apiKey: keys.apiKey,
    secretKey: keys.secretKey
  });
}

// ==============================
// Bitget
// ==============================
export async function getBitgetAccountData(keys: ExchangeKeys) {
  if (!keys.passphrase) {
    throw new Error("Bitget requires a passphrase");
  }
  return await getBitgetData({
    apiKey: keys.apiKey,
    secretKey: keys.secretKey,
    passphrase: keys.passphrase,
  });
}

// ==============================
// BingX
// ==============================
export async function getBingXAccountData(keys: ExchangeKeys) {
  return await getBingxData({
    apiKey: keys.apiKey,
    secretKey: keys.secretKey
  });
}

export async function getAccountData(
  exchange: ExchangeName,
  keys: ExchangeKeys
) {
  const connectors: Record<ExchangeName, (keys: ExchangeKeys) => Promise<any>> = {
    binance: (keys) => getBinanceData({ apiKey: keys.apiKey, secretKey: keys.secretKey }),
    okx: (keys) => {
      if (!keys.passphrase) throw new Error("OKX requires a passphrase");
      return getOkxData({ apiKey: keys.apiKey, secretKey: keys.secretKey, passphrase: keys.passphrase });
    },
    bybit: (keys) => getBybitData({ apiKey: keys.apiKey, secretKey: keys.secretKey }),
    bitget: (keys) => {
      if (!keys.passphrase) throw new Error("Bitget requires a passphrase");
      return getBitgetData({ apiKey: keys.apiKey, secretKey: keys.secretKey, passphrase: keys.passphrase });
    },
    bingx: (keys) => getBingxData({ apiKey: keys.apiKey, secretKey: keys.secretKey }),
  };

  const connector = connectors[exchange];
  if (!connector) {
    throw new Error(`Exchange "${exchange}" is not supported`);
  }

  // Normalized keys to avoid missing fields
  const normalizedKeys: ExchangeKeys = {
    apiKey: keys.apiKey,
    secretKey: keys.secretKey,
    passphrase: keys.passphrase ?? "", // Default to empty string if not provided
  };

  // Validate required fields per exchange
  if (!normalizedKeys.apiKey || !normalizedKeys.secretKey) {
    throw new Error(`API key and secret key are required for ${exchange}`);
  }
  if ((exchange === "okx" || exchange === "bitget") && !normalizedKeys.passphrase) {
    throw new Error(`Passphrase is required for ${exchange}`);
  }

  return connector(normalizedKeys);
}