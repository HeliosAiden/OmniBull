"use client";

import { Button } from "@/app/components/Button";
import { handleConnectWallet } from "@/lib/wallet/connectors";
import Image from "next/image";

export default function EvmConnectPanel() {

  const wallets = [
    { name: "OKX", icon: <Image width={24} height={24} src="/images/icon/okx.png" alt="OKX" />, isRecent: true },
    { name: "MetaMask", icon: <Image width={24} height={24} src="/images/icon/metamask.png" alt="Meta Mask" /> },
    { name: "Phantom", icon: <Image width={24} height={24} src="/images/icon/phantom.png" alt="Phantom" /> },
    { name: "Other Wallet", icon: null }, // svg icon
  ];

  return (
    <div className="space-y-4">

      {/* Wallet Options */}
      <div className="space-y-3">
        {wallets.map((wallet, i) => (
          <button
            key={i}
            onClick={() => handleConnectWallet(wallet.name)}
            className="w-full flex items-center justify-between px-6 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition hover:cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{wallet.name}</span>
              {wallet.isRecent && (
                <span className="text-xs bg-blue-200 dark:bg-zinc-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
                  Recent
                </span>
              )}
            </div>
            <div className="w-8 h-8">{wallet.icon}</div>
          </button>
        ))}
      </div>

      {/* No wallet button */}
      <Button 
        variant="ghost" 
        target="_blank" 
        as="a"
        rel="noopener noreferrer" 
        href="https://ethereum.org/en/wallets/find-wallet/" 
        className="w-full py-3 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mt-4"
      >
        I don’t have a wallet
      </Button>
    </div>
  );
}
