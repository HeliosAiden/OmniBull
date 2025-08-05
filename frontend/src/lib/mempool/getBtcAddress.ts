import mempoolJS from '@mempool/mempool.js';

const { bitcoin: { addresses } } = mempoolJS({
  hostname: 'mempool.space', // or use 'mempool.emzy.de' for testnet, etc.
});

export async function getBtcAddressInfo(address: string) {
  try {
    const addressData = await addresses.getAddress({ address });
    return addressData;
  } catch (error) {
    console.error("Failed to fetch BTC address info:", error);
    return null;
  }
}
