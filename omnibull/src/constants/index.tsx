export const PROJECT_ID:string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''
export const MORALIS_API_KEY:string = process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? ''
export const CMC_API_KEY:string = process.env.NEXT_PUBLIC_CMC_API_KEY ?? ''
export const BIRD_EYE_API_KEY:string = process.env.NEXT_PUBLIC_BIRD_EYE_API_KEY ?? ''

export const SOLANA_CHAIN_KEY = 'sol'
export const BITCOIN_CHAIN_KEY = 'btc'
export const ETHEREUM_CHAIN_KEY = 'eth'
export const BSC_CHAIN_KEY = 'bnb'
export const TRON_CHAIN_KEY = 'trx'
export const ARBITRUM_ONE_CHAIN_KEY = 'arb'
export const AVALANCHE_CHAIN_KEY = 'avax'
export const POLYGON_CHAIN_KEY = 'matic'

export const SUPPORTED_CHAINS = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  sol: 'Solana',
  bsc: 'BSC chain',
  trx: 'Tron',
  arb: 'Arbitrum',
  avax: 'Avalanche',
  matic: 'Polygon'
};

export const CHAIN_MAP: Record<string, string> = {
  eth: '0x1',
  matic: '0x89',
  bsc: '0x38',
  avax: '0xa86a',
  arb: '0xa4b1',
  sol: 'solana',
};

export const CHAIN_TICKER = {
    btc: 'BTC',
    eth: 'ETH',
    sol: 'SOL',
    bsc: 'BNB',
    trx: 'TRX',
    arb: 'ARB',
    avax: 'AVAX',
    matic: 'MATIC',
}

export const TOKEN_TICKER_URL_MAP: Record<string, string> = {
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
  "TRX": "/images/icon/token/L1/tron.png",
  "AAVE": "/images/icon/token/L1/aave.png",
  "DOGE": "/images/icon/token/meme/dogecoin.png",
  "WIF": "/images/icon/token/meme/dogwifcoin.png",
  "FART": "/images/icon/token/meme/fartcoin.png",
  "MEW": "/images/icon/token/meme/cat-in-a-dogs-world.png",
  "PONKE": "/images/icon/token/meme/ponke.png",
  "POPCAT": "/images/icon/token/meme/popcat.png",
  "SHIB": "/images/icon/token/meme/shiba-inu.png",
  "TUT": "/images/icon/token/meme/tutorial.png",
  "BONK": "/images/icon/token/meme/bonk.png",
  "DAI": "/images/icon/token/stablecoin/dai.png",
  "OKB": "/images/icon/token/L1/okb.png",
  "OM": "/images/icon/token/L1/mantra-dao.png",
  "MNT": "/images/icon/token/L1/mantle.png",
  "LDO": "/images/icon/token/L1/lido-dao-wormhole.png",
  "ZRO": "/images/icon/token/L1/layerzero.png",
  "CRV": "/images/icon/token/L1/curve-dao-token.png",
  "PUMP": "/images/icon/token/L1/pump-fun.png",
  "TON": "/images/icon/token/L1/the-open-network.png",
  "RAY": "/images/icon/token/L1/raydium.png",
  "S": "/images/icon/token/L1/sonic.png",
  "UNI": "/images/icon/token/L1/uniswap.png",
  "CBBTC": "/images/icon/token/erc-20/coinbase-wrapped-btc.png",
  "cbBTC": "/images/icon/token/erc-20/coinbase-wrapped-btc.png",
  "BASE": "/images/icon/token/L2/base.png",
  "EIGEN": "/images/icon/token/L2/eigenlayer.png",
  "LINEA": "/images/icon/token/L2/linea.png",
  "OP": "/images/icon/token/L2/optimism.png",
  "stETH": "/images/icon/token/erc-20/staked-ether.png",
  "STETH": "/images/icon/token/erc-20/staked-ether.png",
  "cbETH": "/images/icon/token/erc-20/coinbase-wrapped-staked-eth.png",
  "CBETH": "/images/icon/token/erc-20/coinbase-wrapped-staked-eth.png",
  "NEIRO": "/images/icon/token/meme/neiro-4.png",
  "USDc": "/images/icon/token/stablecoin/usd-coin.png",
  "AEVO": "/images/icon/token/L1/aevo-exchange.png",
  "WETH": "/images/icon/token/erc-20/l2-standard-bridged-weth-base.png",
  "TOSHI": "/images/icon/token/meme/toshi.png",
  "REKT": "/images/icon/token/meme/rekt-4.png",
  "TRB": "/images/icon/token/L1/tellor.png",
  "PENDLE": "/images/icon/token/L1/pendle.png"
};

export const CMC_SYMBOLS = [
  "BTC",
  "ETH",
  "USDT",
  "USDC",
  "SOL",
  "MATIC",
  "ARB",
  "AVAX",
  "BNB",
  "TRX",
  "DOGE",
  "SHIB",
  "UNI",
  "LINK",
  "AAVE",
  "DAI",
  "TON",
  "ONDO",
  "PYUSD",
  "LINK",
  "VIRTUAL",
  "PEPE",
  "OP",
  "LINEA",
  "BASE",
  "CBBTC",
  "UNI",
  "S",
];
