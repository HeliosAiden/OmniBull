// /services/exchanges/binance.ts
import axios from "axios";
import crypto from "crypto";

async function getBinanceServerTime(): Promise<number> {
  const response = await axios.get('https://api.binance.com/api/v3/time');
  return response.data.serverTime;
}

async function signedRequest(
  apiKey: string,
  secretKey: string,
  baseUrl: string,
  endpoint: string,
  params: Record<string, string> = {},
  retryCount = 1
): Promise<any> {
  try {
    const timestamp = await getBinanceServerTime();
    const queryParams = new URLSearchParams({
      ...params,
      timestamp: timestamp.toString(),
      recvWindow: '5000' // 5 second recvWindow
    });
    
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(queryParams.toString())
      .digest('hex');

    const url = `${baseUrl}${endpoint}?${queryParams.toString()}&signature=${signature}`;
    const headers = { 'X-MBX-APIKEY': apiKey };

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.code === -1021 && retryCount > 0) {
      // Timestamp error, retry once
      return signedRequest(apiKey, secretKey, baseUrl, endpoint, params, retryCount - 1);
    }
    throw error;
  }
}

export async function getBinanceData({ apiKey, secretKey }: { 
  apiKey: string; 
  secretKey: string 
}) {
  try {
    // Get account info (spot) and futures positions in parallel
    const [accountInfo, futuresPositions] = await Promise.all([
      signedRequest(apiKey, secretKey, 'https://api.binance.com', '/api/v3/account'),
      signedRequest(apiKey, secretKey, 'https://fapi.binance.com', '/fapi/v2/positionRisk')
    ]);

    return {
      exchange: "binance",
      account: accountInfo,
      positions: futuresPositions
    };
  } catch (error) {
    console.error('Binance API error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Binance data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch Binance data: Unknown error');
    }
  }
}