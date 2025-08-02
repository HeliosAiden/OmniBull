export async function fetchCmcPrices(symbols: string[]) {
  const res = await fetch('/api/cmc-prices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symbols }),
  });

  console.log(res)

  if (!res.ok) throw new Error("Failed to fetch CoinMarketCap prices");

  return res.json();
}
