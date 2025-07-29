"use client";

import { supabase } from "@/lib/supabase";
import { useAccount, useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSession } from "@supabase/auth-helpers-react";
import NetworkSwitcher from "@/app/components/NetworkSwitcher";

export default function UserInfoMenu() {
  const session = useSession();
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const { disconnect: disconnectEvm } = useDisconnect();
  const { publicKey: solanaKey, disconnect: disconnectSolana, connected: solanaConnected } = useWallet();

  const handleLogoutOrDisconnect = () => {
    if (session) supabase.auth.signOut();
    if (evmConnected) disconnectEvm();
    if (solanaConnected) disconnectSolana();
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      {/* Supabase Email */}
      {session?.user?.email && (
        <span className="px-2 py-1 rounded bg-white/10">
          {session.user.email}
        </span>
      )}

      {/* EVM Wallet */}
      {evmConnected && (
        <span className="px-2 py-1 rounded bg-white/10">
          {evmAddress?.slice(0, 6)}...{evmAddress?.slice(-4)}
        </span>
      )}

      {/* Solana Wallet */}
      {solanaConnected && (
        <span className="px-2 py-1 rounded bg-white/10">
          {solanaKey?.toBase58().slice(0, 6)}...
          {solanaKey?.toBase58().slice(-4)}
        </span>
      )}

      {/* Network Switcher */}
      {evmConnected || solanaConnected && <NetworkSwitcher />}

      {/* Logout / Disconnect */}
      {(session || evmConnected || solanaConnected) && (
        <button
          onClick={handleLogoutOrDisconnect}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
        >
          {session ? "Logout" : "Disconnect"}
        </button>
      )}
    </div>
  );
}
