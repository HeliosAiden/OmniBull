export async function fetchBtcPrice(): Promise<number | null> {
  try {
    const res = await fetch("https://mempool.space/api/v1/prices", {
      next: { revalidate: 60 }, // optional: cache for 60 seconds if using in Next.js 13+
    });

    if (!res.ok) throw new Error("Failed to fetch BTC price");

    const data = await res.json();
    return data.USD; // or data.EUR if needed
  } catch (error) {
    console.error("Error fetching BTC price:", error);
    return null;
  }
}