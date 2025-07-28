"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function DexWalletLogin() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-text-primary text-sm font-medium text-center">
        Or connect with a DEX wallet
      </h2>

      <div className="bg-background-card px-4 py-2 transition hover:border-pallete-primary text-center">
        <WalletMultiButton className="!text-text-primary !bg-background-paper !border !border-stroke !hover:border-pallete-hover !hover:text-pallete-primary !rounded-md !py-2 !px-4 !w-full" />
      </div>

      {connected && publicKey && (
        <p className="mt-3 text-xs text-text-secondary truncate">
          Connected: {publicKey.toBase58()}
        </p>
      )}
    </div>
  );
}
