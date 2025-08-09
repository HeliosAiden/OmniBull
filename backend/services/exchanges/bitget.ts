// /services/exchanges/bitget.ts
import axios from "axios";
import crypto from "crypto";

export async function getBitgetData({
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
    .update(timestamp + "GET" + "/api/spot/v1/account/assets")
    .digest("base64");

  const headers = {
    "ACCESS-KEY": apiKey,
    "ACCESS-SIGN": sign,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-PASSPHRASE": passphrase,
  };

  const balances = await axios.get("https://api.bitget.com/api/spot/v1/account/assets", { headers });

  const posSign = crypto
    .createHmac("sha256", secretKey)
    .update(timestamp + "GET" + "/api/mix/v1/position/allPosition")
    .digest("base64");

  const positions = await axios.get(
    "https://api.bitget.com/api/mix/v1/position/allPosition",
    {
      headers: {
        ...headers,
        "ACCESS-SIGN": posSign,
      },
    }
  );

  return {
    exchange: "bitget",
    balances: balances.data,
    positions: positions.data,
  };
}
