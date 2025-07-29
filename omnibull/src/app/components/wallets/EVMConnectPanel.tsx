"use client";

import { Button } from "@/app/components/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { handleConnectWallet } from "@/lib/wallet/connectors";
import Image from "next/image";

function QuickConnectButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            aria-hidden={!ready}
            className="transition-all duration-300"
          >
            {connected ? (
              <button
                className="w-full flex items-center justify-between px-6 py-3
                           bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500
                           text-white rounded-xl shadow-md
                           hover:shadow-lg transition-all duration-300"
              >
                {account.displayName}
              </button>
            ) : (
              <button
                onClick={openConnectModal}
                className="w-full flex items-center justify-between px-6 py-3
                           bg-gradient-to-r from-blue-400 via-navy-500 to-teal-500
                           text-white font-bold rounded-xl shadow-lg
                           hover:brightness-110 hover:cursor-pointer
                           transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span>Quick Connect</span>
                  <div>⚡</div> 
                </div>
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}



export default function EvmConnectPanel() {

  const wallets = [
    { name: "OKX", icon: <Image width={24} height={24} src="/images/icon/okx.png" alt="OKX" />, isRecent: true },
    { name: "MetaMask", icon: <Image width={24} height={24} src="/images/icon/metamask.png" alt="Meta Mask" /> },
    { name: "Phantom", icon: <Image width={24} height={24} src="/images/icon/phantom.png" alt="Phantom" /> },
    { name: "Other Wallet", icon: null }, // svg icon
  ];

  return (
    <div className="space-y-3">
      {/* Quick Connect */}
      <QuickConnectButton />

      {/* Divider */}
      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
        <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
        <span className="text-xs uppercase tracking-wide">or</span>
        <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
      </div>

      {/* Manual Wallet Options */}
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
