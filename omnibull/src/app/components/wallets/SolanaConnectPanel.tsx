"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/app/components/Button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";


// Dynamically import Solana WalletMultiButton (to avoid SSR issues)
const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function SolanaConnectPanel() {
  const { setVisible } = useWalletModal();
  const { connected, publicKey } = useWallet();

  return (
    <div className="space-y-3">
      <button
        onClick={() => setVisible(true)}
        className="w-full flex items-center justify-between px-6 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition hover:cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span>
            {connected && publicKey
              ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
                  .toBase58()
                  .slice(-4)}`
              : "Quick Connect (Solana)"}
          </span>
          {!connected && (
            <span className="text-xs bg-blue-200 dark:bg-zinc-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
              Recommended
            </span>
          )}
        </div>
        <div className="w-8 h-8 relative">
          <Image src="/images/icon/solana.png" alt="Solana" fill />
        </div>
      </button>

      <Button
        href="https://solana.com/vi/solana-wallets"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        className="w-full py-3 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mt-4"
      >
        I don’t have a wallet
      </Button>
    </div>
  );
}
