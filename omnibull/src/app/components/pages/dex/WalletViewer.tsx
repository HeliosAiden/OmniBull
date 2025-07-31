'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import TokenHoldingsView from '@/app/components/TokenHoldings';
import { Button } from '@/app/components/Button';

export default function WalletViewer() {
  const searchParams = useSearchParams();
  const defaultAddress = searchParams.get('address');

  const { address: connectedAddress, isConnected } = useAccount();
  const [inputAddress, setInputAddress] = useState('');
  const [viewAddress, setViewAddress] = useState<string | null>(defaultAddress || null);

  const handleView = () => {
    if (inputAddress) {
      setViewAddress(inputAddress);
    }
  };

  // auto-use connected address if no input or query param
  useEffect(() => {
    if (!viewAddress && isConnected && connectedAddress) {
      setViewAddress(connectedAddress);
    }
  }, [connectedAddress, isConnected]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">DEX Wallet Viewer</h1>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Paste wallet address (0x...)"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleView}>View</Button>
      </div>

      {viewAddress ? (
        <TokenHoldingsView address={viewAddress} />
      ) : (
        <p className="text-gray-500">Connect your wallet or paste an address above.</p>
      )}
    </div>
  );
}
