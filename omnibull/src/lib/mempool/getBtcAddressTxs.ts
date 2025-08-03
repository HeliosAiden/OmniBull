// utils/getBtcAddressTxs.ts

import mempoolJS from '@mempool/mempool.js';

const { bitcoin: { addresses } } = mempoolJS({
  hostname: 'mempool.space',
});

export async function getBtcAddressTxs(address: string) {
  try {
    const txs = await addresses.getAddressTxs({ address });
    return txs;
  } catch (error) {
    console.error("Error fetching BTC address transactions:", error);
    return null;
  }
}
