'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import TokenHoldingsView from '@/components/TokenHoldings';
import { Button } from '@/components/Button';
import ChainSelector from '@/components/ChainSelector'
import { SUPPORTED_CHAINS } from '@/constants';

export default function WalletViewer() {
  const searchParams = useSearchParams();
  const defaultAddress = searchParams.get('address');
  const defaultChain = searchParams.get('chain') as keyof typeof SUPPORTED_CHAINS;

  const { address: connectedAddress, isConnected } = useAccount();

  const [inputAddress, setInputAddress] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>(defaultChain || 'eth');
  const [viewAddress, setViewAddress] = useState<string | null>(defaultAddress || null);
  const [chainKey, setChainKey] = useState<keyof typeof SUPPORTED_CHAINS>('eth');
  const [viewWallet, setViewWallet] = useState(0);

  const handleView = () => {
    if (inputAddress) {
      setViewAddress(inputAddress);
      setChainKey(selectedChain as keyof typeof SUPPORTED_CHAINS);
      setViewWallet(prev => prev + 1)
    }
  };

  useEffect(() => {
    if (!viewAddress && isConnected && connectedAddress) {
      setViewAddress(connectedAddress);
      setChainKey(selectedChain as keyof typeof SUPPORTED_CHAINS); // also default to selected chain
    }
  }, [connectedAddress, isConnected]);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-semibold mb-4">DEX Wallet Viewer</h1>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-6">
        <input
          type="text"
          placeholder="Paste wallet address (0x...)"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded-md"
        />
        <ChainSelector selectedChain={selectedChain} setSelectedChain={setSelectedChain} />
        <Button onClick={handleView}>View</Button>
      </div>

      {viewAddress ? (
        <TokenHoldingsView address={viewAddress} chainKey={chainKey} viewWallet={viewWallet} />
      ) : (
        <p className="text-gray-500">Connect your wallet or paste an address above.</p>
      )}
    </div>
  );
}
