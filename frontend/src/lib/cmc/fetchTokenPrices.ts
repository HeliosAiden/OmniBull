export async function fetchCmcPrices(symbols: string[]) {
  const res = await fetch('/api/cmc-prices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symbols }),
  });

  if (!res.ok) return;

  return res.json();
}
