'use client';

import { useEffect, useState } from 'react';
import { fetchTokenHoldings } from '@/utils/fetchTokenHoldings';
import Table from '@/app/components/Table';

import { Token } from '@/types/token'
import { getTokenLogo } from '@/utils/getTokenLogo'
import Image from 'next/image';


export default function TokenHoldingsView({ address, chainKey }: { address: string, chainKey: string }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTokenHoldings(address, chainKey)
      .then((data) => setTokens(data))
      .finally(() => setLoading(false));
  }, [address]);

  console.log(tokens)

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
                    src={getTokenLogo(row.symbol)}
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
              render: (val: Token['price']) =>
                val ? `$${Number(val).toLocaleString(undefined, { maximumFractionDigits: 6 })}` : '-',
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
        />
      )}
    </div>
  );
}
