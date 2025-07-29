/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any */

import { connect, getWalletClient } from '@wagmi/core'
import { injected, walletConnect } from 'wagmi/connectors'
import { config } from '@/lib/chains/evm'
import { PROJECT_ID } from '@/constants'

const getInjectedProvider = (flag: string) => {
  if (window?.ethereum?.providers) {
    return window.ethereum.providers.find((p: any) => p[flag])
  }
  if ((window.ethereum as any)?.[flag]) return window.ethereum
  return null
}

export async function handleConnectWallet(name: string) {
  try {
    let connector: any = null
    let provider: any = null

    switch (name) {
      case 'MetaMask':
        provider = getInjectedProvider('isMetaMask')
        if (!provider) throw new Error('MetaMask not found')
        await provider.request({ method: 'eth_requestAccounts' }) // ⚠️ trigger UI
        connector = injected({ target: provider })
        break

      case 'OKX':
        provider = getInjectedProvider('isOkxWallet')
        if (!provider) throw new Error('OKX Wallet not found')
        await provider.request({ method: 'eth_requestAccounts' }) // ⚠️ trigger UI
        connector = injected({ target: provider })
        break

      case 'Phantom':
        provider = getInjectedProvider('isPhantom') || (window as any).phantom?.ethereum
        if (!provider) throw new Error('Phantom Wallet not found')
        await provider.request({ method: 'eth_requestAccounts' }) // ⚠️ trigger UI
        connector = injected({ target: provider })
        break

      case 'Other Wallet':
        connector = walletConnect({
          projectId: PROJECT_ID,
          showQrModal: true,
        })
        break
    }

    if (!connector) throw new Error('No connector created.')

    const result = await connect(config, { connector })
    const walletClient = await getWalletClient(config, { connector })

    console.log(`${name} connected`, result, walletClient)
  } catch (err) {
    console.error(`Failed to connect ${name}:`, err)
  }
}

/* eslint-enable no-unused-vars, @typescript-eslint/no-explicit-any */
