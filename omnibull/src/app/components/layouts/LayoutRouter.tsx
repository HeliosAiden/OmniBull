"use client";

import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import AppShell from "./AppShell";
import PublicShell from "./PublicShell";
import { useSupabaseSession } from "@/contexts/SupabaseSessionContext";


export default function LayoutRouter({ children }: { children: React.ReactNode }) {
  const session = useSupabaseSession();

  const { isConnected: evmConnected } = useAccount();
  const { connected: solanaConnected } = useWallet();

  const isAuthenticated = !!session || evmConnected || solanaConnected;

  console.log('isAuthenticated: ' + isAuthenticated)
  console.log(session)
  console.log('evmConnected: ' + evmConnected)
  console.log('solanaConnected: ' + solanaConnected)

  return isAuthenticated ? (
    <AppShell>{children}</AppShell>
  ) : (
    <PublicShell>{children}</PublicShell>
  );
}
