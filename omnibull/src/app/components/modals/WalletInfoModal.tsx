"use client";

import { Dialog } from "@headlessui/react";
import { X, Check, LogOut, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/Button";
import IconButton from "@/app/components/IconButton";
import Snackbar from "@/app/components/Snackbar";

interface WalletInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  balance?: string;
  chain?: string;
  chainIconUrl?: string;
  walletIconUrl?: string;
  onDisconnect: () => void;
}

export default function WalletInfoModal({
  isOpen,
  onClose,
  address,
  balance = "0.00 ETH",
  chain = "Ethereum",
  chainIconUrl = "/images/icon/etherium.png",
  walletIconUrl = "/images/icon/okx.png",
  onDisconnect,
}: WalletInfoModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-zinc-900 p-6 shadow-lg space-y-6 text-white relative">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-semibold">Connected</Dialog.Title>
            <IconButton onClick={onClose} className="text-zinc-400 hover:text-red-500 hover:cursor-pointer">
              <X className="w-5 h-5" />
            </IconButton>
          </div>

          <div className="flex flex-col items-center gap-2">
            {/* Wallet icon as profile circle with chain icon */}
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center">
                {walletIconUrl && (
                <img
                    src={walletIconUrl}
                    alt="Wallet Icon"
                    className="w-16 h-16 rounded-full border-2 border-white object-contain"
                />
                )}
                {chainIconUrl && (
                <img
                    src={chainIconUrl}
                    alt={`${chain} icon`}
                    className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full border-2 border-zinc-900 bg-white p-0.5"
                />
                )}
            </div>
          </div>


          {/* Address + Copy */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <span className="text-md font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <button onClick={copyToClipboard} className="hover:cursor-pointer ml-1">
                <Copy className="w-4 h-4 text-zinc-400 hover:text-white" />
              </button>
            </div>
            <div className="text-sm text-zinc-400">{balance}</div>
          </div>

          {/* Disconnect button */}
          <Button
            variant="outline"
            onClick={() => {
              onDisconnect();
              onClose();
            }}
            className="w-full flex justify-center items-center gap-2 text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>

          {/* Snackbar */}
          <Snackbar
            open={copied}
            onClose={() => setCopied(false)}
            message="Address copied"
            icon={<Check className="w-4 h-4 text-green-400" />}
            position="bottom-right"
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
