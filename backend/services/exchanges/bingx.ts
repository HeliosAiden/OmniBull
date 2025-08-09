// /services/exchanges/bingx.ts
import axios from "axios";
import crypto from "crypto";

function bingxSign(secret: string, params: Record<string, string | number>) {
  const stringParams: Record<string, string> = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, v.toString()])
  );
  return crypto
    .createHmac("sha256", secret)
    .update(new URLSearchParams(stringParams).toString())
    .digest("hex");
}

export async function getBingxData({
  apiKey,
  secretKey,
}: {
  apiKey: string;
  secretKey: string;
}) {
  const timestamp = Date.now();
  const params = { timestamp };

  const signature = bingxSign(secretKey, params);

  const headers = { "X-BX-APIKEY": apiKey };

  const balances = await axios.get(
    `https://open-api.bingx.com/openApi/spot/v1/account/balance?${new URLSearchParams({
      ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, v.toString()])),
      signature: signature.toString(),
    })}`,
    { headers }
  );

  const posParams = { timestamp };
  const posSignature = bingxSign(secretKey, posParams);

  const positions = await axios.get(
    `https://open-api.bingx.com/openApi/swap/v2/user/positions?${new URLSearchParams({
      ...Object.fromEntries(Object.entries(posParams).map(([k, v]) => [k, v.toString()])),
      signature: posSignature.toString(),
    })}`,
    { headers }
  );

  return {
    exchange: "bingx",
    balances: balances.data,
    positions: positions.data,
  };
}
