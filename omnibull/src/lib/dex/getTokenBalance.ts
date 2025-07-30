import { TokenBalance } from "@/types";

export async function getTokenBalances(address: string): Promise<TokenBalance[]> {
  const chainId = 1; // Ethereum
  const apiKey = process.env.NEXT_PUBLIC_COVALENT_KEY;

  const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data?.data?.items) return [];

  return data.data.items
    .filter((item: any) => item.type === "cryptocurrency" && Number(item.balance) > 0)
    .map((item: any) => ({
      symbol: item.contract_ticker_symbol,
      name: item.contract_name,
      contractAddress: item.contract_address,
      decimals: item.contract_decimals,
      raw: item.balance,
      formatted: (Number(item.balance) / 10 ** item.contract_decimals).toString(),
      usdValue: item.quote, // Covalent includes USD price
    }));
}
