// /services/exchanges/bybit.ts
import axios from "axios";
import crypto from "crypto";

export async function getBybitData({
  apiKey,
  secretKey,
}: {
  apiKey: string;
  secretKey: string;
}) {
  const timestamp = Date.now().toString();
  const recvWindow = "5000";

  const params = {
    api_key: apiKey,
    timestamp,
    recv_window: recvWindow,
  };

  const sign = crypto
    .createHmac("sha256", secretKey)
    .update(new URLSearchParams(params).toString())
    .digest("hex");

  // Wallet balance
  const balances = await axios.get(
    `https://api.bybit.com/v2/private/wallet/balance?${new URLSearchParams({
      ...params,
      sign,
    })}`
  );

  // Positions
  const posParams = {
    ...params,
    sign: crypto
      .createHmac("sha256", secretKey)
      .update(new URLSearchParams(params).toString())
      .digest("hex"),
  };

  const positions = await axios.get(
    `https://api.bybit.com/v2/private/position/list?${new URLSearchParams(posParams)}`
  );

  return {
    exchange: "bybit",
    balances: balances.data,
    positions: positions.data,
  };
}
