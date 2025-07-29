"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/app/components/Button";

import { useSession } from "@supabase/auth-helpers-react";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

import { useState, useEffect } from "react";

import UserInfoMenu from "@/app/components/UserInfoMenu";
import ConnectWalletModal from "@/app/components/modals/ConnectWalletModal";


export default function Header() {
  const { theme, setTheme } = useTheme();

  const session = useSession(); // Supabase user session
  const { isConnected: evmConnected } = useAccount();
  const { connected: solanaConnected } = useWallet();

  const isAuthenticated = !!session || evmConnected || solanaConnected;

  const [mounted, setMounted] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="w-full bg-black text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Link href="/">
          <div className="text-xl font-bold tracking-tight hover:text-text-primary transition">
            OmniBull
          </div>
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Authenticated View */}
        {isAuthenticated ? (
          <UserInfoMenu />
        ) : (
          <>
            <Button variant="default" onClick={() => setWalletModalOpen(true)}>
              Connect Wallet
            </Button>
            <Button variant="outline" onClick={() => console.log("Open Login")}>
              Login
            </Button>
          </>
        )}

        {/* Theme Toggle */}
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </Button>
      </div>
      <ConnectWalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </header>
  );
}
