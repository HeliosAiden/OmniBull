"use client";

import dynamic from "next/dynamic";

// Dynamically import Solana WalletMultiButton (to avoid SSR issues)
const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function SolanaConnectPanel({ onConnected }: { onConnected?: () => void }) {
  return (
    <div className="text-center">
      <WalletMultiButton />
    </div>
  );
}
