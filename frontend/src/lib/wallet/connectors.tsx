import { connect } from 'wagmi/actions'
import { config } from '@/lib/chains/evm'
import { injected, walletConnect } from 'wagmi/connectors'
import { PROJECT_ID } from '@/constants'

export async function handleConnectWallet(walletName: string) {
  let connector

  switch (walletName) {
    case 'OKX':
      connector = injected({ target: 'okxWallet', shimDisconnect: true })
      break
    case 'MetaMask':
      connector = injected({ target: 'metaMask', shimDisconnect: true })
      break
    case 'Phantom':
      connector = injected({ target: 'phantom', shimDisconnect: true })
      break
    case 'Other Wallet':
      connector = walletConnect({ projectId: PROJECT_ID })
      break
    default:
      throw new Error('Unknown wallet')
  }

  await connect(config, { connector })
}
