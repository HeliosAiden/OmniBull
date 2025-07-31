import { Token } from "@/types/token";

const TokenSymbolMap: Record<string, string> = {
  "U⁢S⁢D⁤С⁤": "/images/icon/token/stablecoin/usd-coin.png",
  "ЕTH": "/images/icon/token/L1/ethereum.png",
  "ONDO": "/images/icon/token/L1/ondo-finance.png",
  "USDТ": "/images/icon/token/stablecoin/tether.png",
  "PYUSD": '/images/icon/token/stablecoin/paypal-usd.png',
  "LINK": "/images/icon/token/L1/chainlink.png",
  "WBTC": "/images/icon/token/erc-20/wrapped-bitcoin.png",
  "MKR": '/images/icon/token/L1/maker.png',
  "ENA": '/images/icon/token/L1/ethena.png',
  "VIRTUAL": '/images/icon/L1/virtual-protocol.png',
  "PEPE": "/images/icon/token/meme/pepe.png",
  "WLD": "/images/icon/token/L1/worldcoin-wld.png",
  // Add more if needed
};

const defaultLogo = "/images/icon/token/default.png";

export function getTokenLogo(symbol: string): string {
  return TokenSymbolMap[symbol] || defaultLogo;
}
