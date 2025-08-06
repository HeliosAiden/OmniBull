import Moralis from 'moralis';
import { initMoralis } from '@/lib/moralis';
import { CHAIN_MAP, SOLANA_CHAIN_KEY } from '@/constants'
import { filterValidAndSafeTokens } from '@/utils/validateToken'

export async function fetchTokenHoldings(address: string, chainKey: string = 'eth') {
  try {
    await initMoralis();

    const chain = CHAIN_MAP[chainKey];

    if (chainKey === SOLANA_CHAIN_KEY) {
      try {
        const response = await Moralis.SolApi.account.getSPL({ address });
        return filterValidAndSafeTokens(response.toJSON());
      } catch (solanaError: any) {
        throw new Error(`Failed to fetch Solana token balances: ${solanaError.message}`);
      }
    }

    // EVM path
    try {
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });

      return filterValidAndSafeTokens(response.toJSON());
    } catch (evmError: any) {
      throw new Error(`Failed to fetch EVM token balances: ${evmError.message}`);
    }

  } catch (error: any) {
    console.error('fetchTokenHoldings error:', error);
    throw new Error(`Could not fetch token holdings: ${error.message}`);
  }
}

