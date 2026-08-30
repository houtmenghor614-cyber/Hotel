import { useSyncExternalStore } from 'react';

import { subscribeToSettings, getSiteSettings } from '../utils/siteSettings.js';

/** Reactive access to the public site settings (logo, banner, currency, color). */
export function useSiteSettings() {
  return useSyncExternalStore(subscribeToSettings, getSiteSettings);
}

export default useSiteSettings;
