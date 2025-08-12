// /services/exchanges/okx.ts
import axios from "axios";
import crypto from "crypto";

function createOkxSignature(secretKey: string, timestamp: string, method: string, requestPath: string, body: string = "") {
  const prehash = timestamp + method.toUpperCase() + requestPath + body;
  return crypto
    .createHmac("sha256", secretKey)
    .update(prehash)
    .digest("base64");
}

async function okxRequest(apiKey: string, secretKey: string, passphrase: string, method: "GET" | "POST", requestPath: string, body: string = "") {
  const timestamp = new Date().toISOString();
  const sign = createOkxSignature(secretKey, timestamp, method, requestPath, body);

  const headers = {
    "OK-ACCESS-KEY": apiKey,
    "OK-ACCESS-SIGN": sign,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": passphrase,
  };

  const url = `https://www.okx.com${requestPath}`;
  if (method === "GET") {
    return axios.get(url, { headers });
  } else {
    return axios.post(url, body ? JSON.parse(body) : {}, { headers });
  }
}

export async function getOkxData({
  apiKey,
  secretKey,
  passphrase,
}: {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}) {
  // GET balances
  const balancesRes = await okxRequest(apiKey, secretKey, passphrase, "GET", "/api/v5/account/balance");

  // GET positions
  const positionsRes = await okxRequest(apiKey, secretKey, passphrase, "GET", "/api/v5/account/positions");

  return {
    exchange: "okx",
    balances: balancesRes.data,
    positions: positionsRes.data,
  };
}
