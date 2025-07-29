"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Info, X, ArrowLeft } from "lucide-react";
import IconButton from "@/app/components/IconButton";
import { Button } from "@/app/components/Button";
import EvmConnectPanel from "@/app/components/wallets/EVMConnectPanel";
import SolanaConnectPanel from "@/app/components/wallets/SolanaConnectPanel";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    title: "Full privacy & transparency",
    emoji: "🔐",
    description: "You control your own wallet.",
  },
  {
    title: "A better way to login",
    emoji: "🚪",
    description: "Sign in without login. Just one click with your wallet.",
  },
  {
    title: "Explore the world of web3",
    emoji: "🌐",
    description: "Gain access to DeFi, NFTs, DAOs and much more.",
  },
];

export default function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const [tab, setTab] = useState<"evm" | "solana">("evm");
  const [showAbout, setShowAbout] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl relative space-y-4">
          <div className="flex items-center justify-between">
            <IconButton
              onClick={() => setShowAbout((prev) => !prev)}
              title={showAbout ? "Back to Wallet Connection" : "About wallets"}
            >
              {showAbout ? (
                <ArrowLeft className="w-5 h-5 text-gray-500 hover:text-blue-500" />
              ) : (
                <Info className="w-5 h-5 text-gray-500 hover:text-blue-500" />
              )}
            </IconButton>

            <Dialog.Title className="text-lg font-semibold text-center flex-1 ml-2">
              {showAbout ? "About Wallets" : "Connect Wallet"}
            </Dialog.Title>

            <IconButton onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-red-500 hover:cursor-pointer" />
            </IconButton>
          </div>

          {/* Main content */}
          {showAbout ? (
            <div className="text-center px-4 space-y-4">
              <div className="text-4xl">{slides[slideIndex].emoji}</div>
              <h3 className="text-xl font-semibold">{slides[slideIndex].title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {slides[slideIndex].description}
              </p>

              {/* Slide controls */}
              <div className="flex justify-between items-center text-sm text-blue-500 font-medium">
                <button onClick={prevSlide} className="hover:cursor-pointer">
                  &larr; Previous
                </button>
                <button onClick={nextSlide} className="hover:cursor-pointer">
                  Next &rarr;
                </button>
              </div>

              {/* Slide dots */}
              <div className="flex justify-center gap-2">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      slideIndex === idx ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Learn more */}
              <div className="pt-2">
                <Button
                  as="a"
                  href="https://ethereum.org/en/wallets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400"
                >
                  Learn more ↗
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex space-x-2 border-b pb-2">
                <button
                  className={`px-4 py-2 transition-colors hover:cursor-pointer ${
                    tab === "evm"
                      ? "border-b-2 border-blue-500 font-bold"
                      : "text-gray-500 hover:text-black dark:hover:text-white"
                  }`}
                  onClick={() => setTab("evm")}
                >
                  EVM Wallet
                </button>
                <button
                  className={`px-4 py-2 transition-colors hover:cursor-pointer ${
                    tab === "solana"
                      ? "border-b-2 border-blue-500 font-bold"
                      : "text-gray-500 hover:text-black dark:hover:text-white"
                  }`}
                  onClick={() => setTab("solana")}
                >
                  Solana Wallet
                </button>
              </div>

              {/* Wallet Panels */}
              <div className="pt-2">
                {tab === "evm" ? (
                  <EvmConnectPanel />
                ) : (
                  <SolanaConnectPanel />
                )}
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
