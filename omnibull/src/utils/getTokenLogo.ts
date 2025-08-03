import { TOKEN_TICKER_URL_MAP } from '@/constants'


const defaultLogo = "/images/icon/token/default.png";

export function getTokenLogoURL(ticker: string): string {
  const sanitizedTicker = ticker.replace(/[^\x00-\x7F]/g, ''); // remove non-ASCII
  return TOKEN_TICKER_URL_MAP[sanitizedTicker] || defaultLogo;
}