export function formatPriceCMCStyle(price: any): string {
  if (price >= 1) {
    return `$${price.toFixed(2)}`;
  } else if (price >= 0.1) {
    return `$${price.toFixed(3)}`;
  } else if (price >= 0.01) {
    return `$${price.toFixed(4)}`;
  } else if (price >= 0.001) {
    return `$${price.toFixed(5)}`;
  } else if (price >= 0.0001) {
    return `$${price.toFixed(6)}`;
  } else {
    return `$${price.toPrecision(8)}`; // for extremely small prices
  }
}
