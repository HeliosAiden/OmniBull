// /services/exchanges/binance.ts
import axios from "axios";
import crypto from "crypto";

export async function getBinanceData({ apiKey, secretKey }: { apiKey: string; secretKey: string }) {
  const timestamp = Date.now();
  const query = new URLSearchParams({ timestamp: timestamp.toString() }).toString();
  const signature = crypto.createHmac("sha256", secretKey).update(query).digest("hex");

  const headers = { "X-MBX-APIKEY": apiKey };

  // Account info (spot)
  const accountInfo = await axios.get(`https://api.binance.com/api/v3/account?${query}&signature=${signature}`, { headers });

  // Futures positions
  const futuresPositions = await axios.get(`https://fapi.binance.com/fapi/v2/positionRisk?${query}&signature=${signature}`, { headers });

  return {
    exchange: "binance",
    account: accountInfo.data,
    positions: futuresPositions.data
  };
}
