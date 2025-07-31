'use client';

import { useEffect, useState } from 'react';
import { fetchTokenHoldings } from '@/utils/fetchTokenHoldings';
import Table from '@/app/components/Table';

import { Token } from '@/types/token'
import { getTokenLogo } from '@/utils/getTokenLogo'
import Image from 'next/image';


export default function TokenHoldingsView({ address }: { address: string }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTokenHoldings(address)
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
            { key: 'symbol', label: 'Symbol', render: (val) => <span><Image src={getTokenLogo(val)} width={20} height={20} alt={val} /></span> },
            { key: 'name', label: 'Name' },
            {
              key: 'balance',
              label: 'Balance',
              render: (val, row) =>
                (Number(val) / 10 ** row.decimals).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                }),
            },
            ...(tokens[0]?.price
              ? [
                  {
                    key: 'price' as keyof Token,
                    label: 'Price (USD)',
                    render: (val: Token['price']) =>
                      val ? `$${Number(val).toLocaleString()}` : '-',
                  },
                ]
              : []),
          ]}
          data={tokens}
          emptyText="No token holdings found."
        />
      )}
    </div>
  );
}
