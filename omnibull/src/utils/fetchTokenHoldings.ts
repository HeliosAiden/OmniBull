import Moralis from 'moralis';
import { initMoralis } from '@/lib/moralis';

const CHAIN_MAP: Record<string, string> = {
  eth: '0x1',
  polygon: '0x89',
  bsc: '0x38',
  avalanche: '0xa86a',
  arbitrum: '0xa4b1',
};

export async function fetchTokenHoldings(address: string, chainKey: string = 'eth') {
  await initMoralis();

  const chain = CHAIN_MAP[chainKey];

  if (!chain) {
    throw new Error(`Unsupported chain: ${chainKey}`);
  }

  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });

  return response.toJSON();
}
