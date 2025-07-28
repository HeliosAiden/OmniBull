'use client'

import { ReactNode } from 'react'
import { 
  WagmiProvider,
  http,
  WagmiConfig  // For v1 compatibility (if needed)
} from 'wagmi'
// import { mainnet, sepolia } from 'wagmi/chains'
import {
  mainnet,
  sepolia,
  optimism,
  arbitrum,
  polygon,
  base,
  avalanche,
  bsc,
  gnosis,
} from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const chains = [mainnet, sepolia] as const

const projectId: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''

const config = getDefaultConfig({
  appName: 'OmniBull',
  projectId: projectId, // Required for WalletConnect
  chains,
  transports: {
    [mainnet.id]: http('https://rpc.ankr.com/eth'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
    [optimism.id]: http('https://rpc.ankr.com/optimism'),
    [arbitrum.id]: http('https://arb1.arbitrum.io/rpc'),
    [polygon.id]: http('https://polygon-rpc.com'),
    [base.id]: http('https://mainnet.base.org'),
    [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
    [bsc.id]: http('https://bsc-dataseed.binance.org/'),
    [gnosis.id]: http('https://rpc.gnosis.gateway.fm'),
  },
  ssr: true, // If using SSR
})

const queryClient = new QueryClient()

export function EVMProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}