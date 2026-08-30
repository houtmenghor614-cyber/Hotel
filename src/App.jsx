import { useEffect } from 'react';

import AppRoutes from './routes/AppRoutes.jsx';
import settingsApi from './api/settingsApi.js';
import { setSiteSettings } from './utils/siteSettings.js';

export default function App() {
  // Load the public site settings (logo, banner, currency, brand color) that the
  // admin configures in the admin panel, and apply them app-wide.
  useEffect(() => {
    let cancelled = false;
    settingsApi
      .getPublic()
      .then(({ data }) => {
        if (!cancelled) setSiteSettings(data);
      })
      .catch(() => {
        // Settings unavailable — keep defaults
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <AppRoutes />;
}
