// /services/exchanges/okx.ts
import axios from "axios";
import crypto from "crypto";

export async function getOkxData({
  apiKey,
  secretKey,
  passphrase,
}: {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}) {
  const timestamp = new Date().toISOString();
  const sign = crypto
    .createHmac("sha256", secretKey)
    .update(timestamp + "GET" + "/api/v5/account/balance")
    .digest("base64");

  const headers = {
    "OK-ACCESS-KEY": apiKey,
    "OK-ACCESS-SIGN": sign,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": passphrase,
  };

  // Account balances
  const balances = await axios.get("https://www.okx.com/api/v5/account/balance", { headers });

  // Positions
  const positions = await axios.get("https://www.okx.com/api/v5/account/positions", { headers });

  return {
    exchange: "okx",
    balances: balances.data,
    positions: positions.data,
  };
}
