"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAccount, useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import NetworkSwitcher from "@/app/components/NetworkSwitcher";
import { useSupabaseSession } from "@/contexts/SupabaseSessionContext";
import WalletInfoModal from "@/app/components/modals/WalletInfoModal";
import Image from "next/image";
import { Button } from "@/app/components/Button";

const walletIconMap: Record<string, string> = {
  "MetaMask": "/images/icon/metamask.png",
  "OKX Wallet": "/images/icon/okx.png",
  "Phantom": "/images/icon/phantom.png",
  // Add more as needed
};



export default function UserInfoMenu() {
  const session = useSupabaseSession();
  const { address: evmAddress, isConnected: evmConnected, connector: evmConnector } = useAccount();
  const { disconnect: disconnectEvm } = useDisconnect();
  const { publicKey: solanaKey, disconnect: disconnectSolana, connected: solanaConnected, wallet: solanaWallet } = useWallet();
  const [openWalletInfoModal, setOpenWalletInfoModal] = useState<boolean>(false)

  const evmWalletName = evmConnector?.name;     // e.g., "MetaMask", "OKX Wallet"
  const solanaWalletName = solanaWallet?.adapter.name; // e.g., "Phantom"


  const isSolana = solanaConnected && solanaKey;
  const isEvm = evmConnected && evmAddress;
  
  const handleLogoutOrDisconnect = () => {
    if (session) supabase.auth.signOut();
    if (isEvm) disconnectEvm();
    if (isSolana) disconnectSolana();
  };

  const walletAddress: string =
    isSolana
      ? solanaKey.toBase58()
      : isEvm
      ? evmAddress
      : '';

  const onDisconnect = isSolana
      ? disconnectSolana
      : isEvm
      ? disconnectEvm
      : () => {};

  const walletIconUrl = 
    evmConnector?.name ? walletIconMap[evmConnector.name] :
    solanaWallet?.adapter.name ? walletIconMap[solanaWallet.adapter.name] :
    undefined;

  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <WalletInfoModal 
        isOpen={openWalletInfoModal} 
        onClose={() => setOpenWalletInfoModal(false)} 
        address={walletAddress} 
        onDisconnect={onDisconnect}
        balance="1.23"
        chain={isSolana ? "Solana" : isEvm ? "Ethereum" : undefined}
        chainIconUrl={isSolana
          ? "/images/icon/solana.png"
          : isEvm
          ? "/images/icon/etherium.png"
          : undefined
        }
        walletIconUrl={walletIconUrl}
      />

      {/* Supabase Email */}
      {session?.user?.email && (
        <span className="px-2 py-1 rounded bg-white/10">
          {session.user.email}
        </span>
      )}

      {/* EVM Wallet */}
      {evmConnected && evmAddress && (
        <Button variant="ghost" onClick={() => setOpenWalletInfoModal(true)} className="flex items-center gap-2 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition text-white hover:cursor-pointer">
          <Image src={walletIconUrl ?? "/images/icon/okx.png"} alt="Etherium Wallet" height={22} width={22} />
          {evmAddress.slice(0, 6)}...{evmAddress.slice(-4)}
        </Button>
      )}

      {/* Solana Wallet */}
      {solanaConnected && solanaKey && (
      <Button variant="ghost" onClick={() => setOpenWalletInfoModal(true)} className="flex items-center gap-2 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition text-white hover:cursor-pointer">
        <Image src={walletIconUrl ?? "/images/icon/phantom.png"} alt="Solana Wallet" height={22} width={22} />
        {solanaKey.toBase58().slice(0, 6)}...{solanaKey.toBase58().slice(-4)}
      </Button>
    )}

      {/* Network Switcher */}
      {(evmConnected || solanaConnected) && <NetworkSwitcher />}

      {/* Logout / Disconnect */}
      {(session || evmConnected || solanaConnected) && (
        <Button
          variant="outline"
          onClick={handleLogoutOrDisconnect}
          className="text-white px-2 py-1 rounded hover:bg-red-600 transition hover:cursor-pointer"
        >
          {session ? "Logout" : "Disconnect"}
        </Button>
      )}
    </div>
  );
}
