import { applyThemeColor } from './theme.js';
import { setCurrency } from './formatPrice.js';

/** In-memory public site settings, applied app-wide and exposed reactively. */

let site = {};
const listeners = new Set();

export function subscribeToSettings(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setSiteSettings(settings = {}) {
  site = settings;
  if (settings.brand_color) applyThemeColor(settings.brand_color);
  setCurrency(settings.currency, settings.currency_symbol);
  listeners.forEach((listener) => listener());
}

export function getSiteSettings() {
  return site;
}

export default { subscribeToSettings, setSiteSettings, getSiteSettings };
