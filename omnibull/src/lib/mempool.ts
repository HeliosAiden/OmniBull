import axios from 'axios';

const MEMPOOL_BASE = 'https://mempool.space/api';

export async function getMempoolTransactions() {
  const res = await axios.get(`${MEMPOOL_BASE}/mempool/transactions`);
  return res.data.transactions || [];
}

export async function getBlocks(limit = 10) {
  const res = await axios.get(`${MEMPOOL_BASE}/blocks?limit=${limit}`);
  return res.data;
}

export async function getAddressInfo(address: string) {
  const res = await axios.get(`${MEMPOOL_BASE}/address/${address}`);
  return res.data;
}
