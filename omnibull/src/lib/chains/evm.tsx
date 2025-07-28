'use client'

import { ReactNode } from 'react'
import { 
  WagmiProvider,
  http,
  WagmiConfig  // For v1 compatibility (if needed)
} from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
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