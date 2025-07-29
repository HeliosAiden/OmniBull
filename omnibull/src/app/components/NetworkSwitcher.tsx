import { useAccount, useChainId } from "wagmi";
import { switchChain } from '@wagmi/core'
import { chains, config } from '@/lib/chains/evm'

export default function NetworkSwitcher() {
  const chainId = useChainId()
  const { isConnected } = useAccount()

  console.log('chains: ' + chains)
  if (!isConnected) return null


  return (
    <select
      value={chainId}
      onChange={async (e) => {
        const selected = chains.find((c) => c.id === Number(e.target.value))
        if (!selected) return
        try {
        await switchChain(config, { chainId: selected.id })
        } catch (err) {
        console.error("Failed to switch network", err)
        }
    }}
      className="bg-white dark:bg-zinc-900 border px-2 py-1 rounded"
    >
      {chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </select>
  )
}
