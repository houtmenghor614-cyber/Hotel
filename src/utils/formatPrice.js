/** Currency-aware price formatting.
 *  setCurrency() is called from siteSettings once the public settings load,
 *  so every price display follows the admin-configured "type of money"
 *  (Dollar / Riel / VND / ...).
 */

let currencyCode = 'VND';
let currencySymbol = '₫';

export function setCurrency(code, symbol) {
  currencyCode = code || 'VND';
  currencySymbol = symbol || defaultSymbol(currencyCode);
}

export function getCurrency() {
  return { code: currencyCode, symbol: currencySymbol };
}

function defaultSymbol(code) {
  switch (code) {
    case 'VND': return '₫';
    case 'KHR': return '៛';
    case 'USD': return '$';
    default: return code || '₫';
  }
}

/** Format a number as money using the active currency. */
export function formatPrice(amount, { compact = false } = {}) {
  const value = Number(amount || 0);

  if (currencyCode === 'VND') {
    if (compact) {
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}Mđ`;
      if (value >= 1_000) return `${(value / 1_000).toFixed(0)}kđ`;
      return `${value.toLocaleString('vi-VN')}đ`;
    }
    return `${value.toLocaleString('vi-VN')}₫`;
  }

  if (currencyCode === 'KHR') {
    if (compact) {
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M៛`;
      if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k៛`;
      return `${Math.round(value)}៛`;
    }
    return `${Math.round(value).toLocaleString('en-US')}៛`;
  }

  if (compact) {
    if (value >= 1_000_000) return `${currencySymbol}${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (value >= 1_000) return `${currencySymbol}${Math.round(value / 1_000)}k`;
    return `${currencySymbol}${Math.round(value).toLocaleString('en-US')}`;
  }

  try {
    return value.toLocaleString('en-US', { style: 'currency', currency: currencyCode });
  } catch {
    return `${currencySymbol}${value.toLocaleString('en-US')}`;
  }
}

export default formatPrice;
