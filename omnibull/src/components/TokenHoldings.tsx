'use client';

import { useEffect, useState } from 'react';
import { fetchTokenHoldings } from '@/utils/fetchTokenHoldings';
import { fetchCmcPrices } from '@/lib/cmc/fetchTokenPrices';
import Table from '@/components/Table';
import Image from 'next/image';
import { getTokenLogoURL } from '@/utils/getTokenLogo';
import { Token } from '@/types/token';

export default function TokenHoldingsView({ address, chainKey }: { address: string, chainKey: string }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('address')
  console.log(address)
  console.log('chainKey')
  console.log(chainKey)

  useEffect(() => {
    const loadHoldingsWithPrices = async () => {
      try {
        setLoading(true);

        if (!address || !chainKey) return

        // 1. Fetch token holdings
        const holdings = await fetchTokenHoldings(address, chainKey);

        // 2. Extract unique token symbols
        const uniqueSymbols = [...new Set(holdings.map(t => t.symbol))];

        // 3. Fetch prices from CoinMarketCap
        const cmcData = await fetchCmcPrices(uniqueSymbols);

        // 4. Merge prices into tokens
        const enriched = holdings.map((token) => {
          const symbol = token.symbol.toUpperCase();
          const cmcInfo = cmcData[symbol]?.quote?.USD;
          const price = typeof cmcInfo?.price === 'number' ? cmcInfo.price : undefined;
          return {
            ...token,
            price,
            // Ensure all Token properties are present
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
          };
        });

        setTokens(enriched);
      } catch (err) {
        console.error('Failed to load token prices:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHoldingsWithPrices();
  }, [address, chainKey]);

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
              render: (_, row) => (
                <div className="flex items-center gap-2">
                  <Image
                    src={getTokenLogoURL(row.symbol)}
                    width={20}
                    height={20}
                    alt={row.symbol}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{row.symbol}</span>
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
              key: 'balance',
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
              key: 'balance',
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
    </div>
  );
}
