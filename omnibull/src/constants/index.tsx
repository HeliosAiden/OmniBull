export const PROJECT_ID:string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''
export const MORALIS_API_KEY:string = process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? ''

export const SUPPORTED_CHAINS = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  sol: 'Solana',
  bsc: 'BNB chain',
  tron: 'Rron',
  arbitrum: 'Arbitrum',
  avalanche: 'Avalanche',
  polygon: 'Polygon',
};

export const CHAIN_TICKER = {
    btc: 'BTC',
    eth: 'ETH',
    sol: 'SOL',
    bsc: 'BNB',
    tron: 'TRX',
    arbitrum: 'ARB',
    avalanche: 'AVAX',
    polygon: 'MATIC',
}

export const CHAIN_TICKER_URL_MAP: Record<string, string> = {
  "BTC": "/images/icon/token/L1/bitcoin.png",
  "ETH": "/images/icon/token/L1/ethereum.png", // ✅ fixed
  "USDC": "/images/icon/token/stablecoin/usd-coin.png", // ✅ fixed
  "ONDO": "/images/icon/token/L1/ondo-finance.png",
  "USDT": "/images/icon/token/stablecoin/tether.png", // ✅ fixed
  "PYUSD": "/images/icon/token/stablecoin/paypal-usd.png",
  "LINK": "/images/icon/token/L1/chainlink.png",
  "WBTC": "/images/icon/token/erc-20/wrapped-bitcoin.png",
  "MKR": "/images/icon/token/L1/maker.png",
  "ENA": "/images/icon/token/L1/ethena.png",
  "VIRTUAL": "/images/icon/L1/virtual-protocol.png",
  "PEPE": "/images/icon/token/meme/pepe.png",
  "WLD": "/images/icon/token/L1/worldcoin-wld.png",
  "MATIC": "/images/icon/token/erc-20/matic-network.png",
  "AVAX": "/images/icon/token/L1/avalanche.png",
  "BNB": "/images/icon/token/L1/bsc.png",
  "SOL": "/images/icon/token/L1/solana.png",
  "ARB": "/images/icon/token/L2/arbitrum_one.png",
  "TRX": "/images/icon/token/L1/tron.png"
};