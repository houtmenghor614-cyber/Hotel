import api from './axios.js';

/** Public site settings (no auth required). */
export const settingsApi = {
  getPublic: () => api.get('/settings/public'),
};

export default settingsApi;
