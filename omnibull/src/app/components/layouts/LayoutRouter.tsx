"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

import AppShell from "./AppShell";
import PublicShell from "./PublicShell";

export default function LayoutRouter({ children }: { children: React.ReactNode }) {
  const session = useSession(); // Supabase auth session
  const { isConnected: evmConnected } = useAccount();
  const { connected: solanaConnected } = useWallet();

  const [isReady, setIsReady] = useState(false);

  const isAuthenticated = !!session || evmConnected || solanaConnected;

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  console.log('isAuthenticated: ' + isAuthenticated)
  console.log('session: ' + session)
  console.log('evmConnected: ' + evmConnected)
  console.log('solanaConnected: ' + solanaConnected)

  return isAuthenticated ? <AppShell>{children}</AppShell> : <PublicShell>{children}</PublicShell>;
}
