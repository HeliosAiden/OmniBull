// Fetch price from Birdeye using Solana mint address

import { BIRD_EYE_API_KEY } from "@/constants"

export async function fetchSolanaPrices(mints: string[]) {
  const results: Record<string, { price: number }> = {};

  await Promise.all(
    mints.map(async (mint) => {
      try {
        const res = await fetch(`https://public-api.birdeye.so/defi/price?address=${mint}`, {
          headers: {
            'X-API-KEY': BIRD_EYE_API_KEY,
          },
        });

        const json = await res.json();

        if (json?.data?.value) {
          results[mint] = { price: json.data.value };
        }
      } catch (e) {
        console.warn(`Failed to fetch price for ${mint}:`, e);
      }
    })
  );

  return results;
}
