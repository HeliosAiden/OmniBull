type Token = {
  name: string;
  symbol: string;
  [key: string]: any;
};

/**
 * Filters a list of tokens by:
 * 1. Validating symbol format (uppercase, 2–10 alphanumeric)
 * 2. Removing suspicious/phishing tokens with URLs or scam keywords
 */
export function filterValidAndSafeTokens(tokens: Token[]): Token[] {
  if (!Array.isArray(tokens) || tokens.length === 0) return [];

  return tokens.filter((token) => {
    const symbol = token.symbol?.toUpperCase();
    const isValidSymbol = /^[A-Z0-9]{2,10}$/.test(symbol);
    if (!isValidSymbol) return false;

    const fieldsToCheck = [token.name, token.symbol].join(" ").toLowerCase();
    const hasUrl = /http|\.com|\.org|\.net/.test(fieldsToCheck);
    const hasPhishingWords = /(claim|reward|bonus|airdrop|visit|free|token|earn)/.test(fieldsToCheck);

    return !hasUrl && !hasPhishingWords;
  });
}
