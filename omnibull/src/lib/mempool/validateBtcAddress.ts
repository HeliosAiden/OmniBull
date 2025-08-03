// utils/validateBtcAddressRest.ts

export async function validateBtcAddress(address: string): Promise<{ isvalid: boolean; address?: string } | null> {
  try {
    const res = await fetch(`https://mempool.space/api/v1/validate-address/${address}`);

    if (!res.ok) throw new Error(`Validation request failed: ${res.statusText}`);

    const data = await res.json(); // { isvalid: boolean, address: string }
    return data;
  } catch (err) {
    console.error('Error validating BTC address:', err);
    return null;
  }
}
