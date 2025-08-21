// /services/exchanges/bingx.ts
import axios from "axios";
import crypto from "crypto";

function bingxSign(secret: string, params: Record<string, string | number>) {
  const queryString = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, v.toString()])
  ).toString();

  return crypto.createHmac("sha256", secret).update(queryString).digest("hex");
}

export async function getBingxData({
  apiKey,
  secretKey,
}: {
  apiKey: string;
  secretKey: string;
}) {
  const timestamp = Date.now(); // ✅ correct param name
  const recvWindow = 60000;     // ✅ recommended by docs

  // ---------------- Spot Balance ----------------
  const balanceParams = {
    recvWindow,
    timestamp,
  };
  const balanceSignature = bingxSign(secretKey, balanceParams);

  const balances = await axios.get(
    `https://open-api.bingx.com/openApi/spot/v1/account/balance?${new URLSearchParams(
      {
        ...Object.fromEntries(
          Object.entries(balanceParams).map(([k, v]) => [k, v.toString()])
        ),
        signature: balanceSignature,
      }
    )}`,
    { headers: { "X-BX-APIKEY": apiKey } }
  );

  // ---------------- Positions ----------------
  const posParams = {
    recvWindow,
    timestamp: Date.now(), // new timestamp for each request
  };
  const posSignature = bingxSign(secretKey, posParams);

  const positions = await axios.get(
    `https://open-api.bingx.com/openApi/swap/v2/user/positions?${new URLSearchParams(
      {
        ...Object.fromEntries(
          Object.entries(posParams).map(([k, v]) => [k, v.toString()])
        ),
        signature: posSignature,
      }
    )}`,
    { headers: { "X-BX-APIKEY": apiKey } }
  );

  return {
    exchange: "bingx",
    balances: balances.data,
    positions: positions.data,
  };
}
