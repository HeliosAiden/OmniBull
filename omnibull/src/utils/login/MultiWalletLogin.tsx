"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function MultiWalletLogin() {
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const { publicKey: solanaKey, connected: solanaConnected } = useWallet();

  return (
    <div className="flex flex-col gap-6 mt-6 w-full">
      {/* EVM Wallet Section */}
      <div className="p-4 rounded-xl bg-background-card border border-stroke shadow-md">
        <h3 className="text-text-primary text-sm mb-2">
          Connect with EVM Wallet (e.g. MetaMask)
        </h3>
        <ConnectButton showBalance={false} chainStatus="icon" />
        {evmConnected && evmAddress && (
          <p className="mt-2 text-text-secondary text-xs break-all">
            ✅ Connected: {evmAddress}
          </p>
        )}
      </div>

      {/* Solana Wallet Section */}
      <div className="p-4 rounded-xl bg-background-card border border-stroke shadow-md">
        <h3 className="text-text-primary text-sm mb-2">
          Connect with Solana Wallet (e.g. Phantom)
        </h3>
        <WalletMultiButton className="!bg-pallete-primary hover:!bg-pallete-hover transition-colors" />
        {solanaConnected && solanaKey && (
          <p className="mt-2 text-text-secondary text-xs break-all">
            ✅ Connected: {solanaKey.toBase58()}
          </p>
        )}
      </div>
    </div>
  );
}
