'use client';

import { useEffect, useState } from 'react';
import { fetchTokenHoldings } from '@/utils/fetchTokenHoldings';
import { fetchCmcPrices } from '@/lib/cmc/fetchTokenPrices';
import { fetchSolanaPrices } from '@/lib/birdeye/fetchSolanaPrices';
import Table from '@/components/Table';
import Image from 'next/image';
import { getTokenLogoURL } from '@/utils/getTokenLogo';
import { Token } from '@/types/token';
import { SOLANA_CHAIN_KEY } from '@/constants';
import Snackbar from '@/components/Snackbar';
import { X } from 'lucide-react';


export default function TokenHoldingsView({ address, chainKey, viewWallet }: { address: string, chainKey: string, viewWallet: number }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const loadHoldingsWithPrices = async () => {
    try {
      setLoading(true);

      if (!address || !chainKey) return;

      // 1. Fetch token holdings
      const holdings = await fetchTokenHoldings(address, chainKey);

      if (chainKey == SOLANA_CHAIN_KEY) {
        const mints = holdings.map(holding => holding.mint);
        const priceMap = await fetchSolanaPrices(mints);

        const enriched = holdings
          .map((token) => {
            const price = priceMap[token.mint]?.price

            if (!price) return null;

            return {
              ...token,
              price,
              balance: token.balance,
              decimals: token.decimals,
              name: token.name,
              symbol: token.symbol,
            };
          })
          .filter((t): t is NonNullable<typeof t> => t !== null); // Remove nulls

        setTokens(enriched);

      } else {
        // 2. Extract unique token symbols
        const uniqueSymbols = [...new Set(holdings.map((t) => t.symbol))];

        // 3. Fetch prices from CoinMarketCap
        const cmcData = await fetchCmcPrices(uniqueSymbols);

        // 4. Merge prices into tokens, but only include if CMC price exists
        const enriched = holdings
          .map((token) => {
            const symbol = token.symbol.toUpperCase();
            const cmcInfo = cmcData[symbol]?.quote?.USD;
            const price = typeof cmcInfo?.price === 'number' ? cmcInfo.price : undefined;

            if (price === undefined) return null; // Mark for removal

            return {
              ...token,
              price,
              balance: token.balance,
              decimals: token.decimals,
              name: token.name,
              symbol: token.symbol,
            };
          })
          .filter((t): t is NonNullable<typeof t> => t !== null); // Remove nulls

        setTokens(enriched);
      }

      
    } catch (err:any) {
      console.error('Failed to load token prices:', err);
      setOpenSnackbar(true)
      setErrorMsg(err)

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHoldingsWithPrices();
  }, [address, chainKey, viewWallet]);


  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Token Holdings</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table<Token>
          columns={[
            {
              key: 'symbol',
              label: 'Asset',
              render: (val, row) => (
                <div className="flex items-center gap-2">
                  <Image
                    src={getTokenLogoURL(val)}
                    width={20}
                    height={20}
                    alt={val}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{val}</span>
                    <span className="text-xs text-gray-400">{row.name}</span>
                  </div>
                </div>
              ),
            },
            {
              key: 'price',
              label: 'Price',
              align: 'right',
              render: (_, row) =>
                row.price
                  ? `$${Number(row.price).toLocaleString(undefined, { maximumFractionDigits: 6 })}`
                  : '-',
            },
            {
              key: 'amount',
              label: 'Holdings',
              align: 'right',
              render: (val, row) => {
                const formatted = Number(val) / 10 ** row.decimals;
                return `${formatted.toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })} ${row.symbol}`;
              },
            },
            {
              key: 'amount',
              label: 'Value',
              align: 'right',
              render: (val, row) => {
                const quantity = Number(val) / 10 ** row.decimals;
                const value = row.price ? quantity * Number(row.price) : 0;
                return row.price
                  ? `$${value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}`
                  : '-';
              },
            },
          ]}
          data={tokens}
          emptyText="No token holdings found."
          rowsPerPage={5}
        />
      )}
      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={errorMsg}
        icon={<X className="w-4 h-4 text-red-400" />}
        position="top-right"
      />
    </div>
  );
}
