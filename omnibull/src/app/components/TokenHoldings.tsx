'use client';

import { useEffect, useState } from 'react';
import { fetchTokenHoldings } from '@/utils/fetchTokenHoldings';

export default function TokenHoldingsView({ address }: { address: string }) {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    fetchTokenHoldings(address).then(setTokens);
  }, [address]);

  return (
    <div>
      <h2>Token Holdings</h2>
      <ul>
        {tokens.map((token, i) => (
          <li key={i}>
            {token.symbol}: {Number(token.balance) / 10 ** token.decimals}
          </li>
        ))}
      </ul>
    </div>
  );
}
