/** Resolve asset URLs for production.
 *
 *  The API base (VITE_API_URL) may point at the deployed backend, e.g.
 *    https://hotel-api.onrender.com/api/v1
 *  While uploaded images live at  https://hotel-api.onrender.com/uploads/...
 *  This helper prefixes `/uploads/...` paths with the API origin so images
 *  keep working when the frontend is served from a different domain (Render
 *  static site, CDN, etc.). Local development falls back to the same origin.
 */
const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export function apiOrigin() {
  return String(API_BASE).replace(/\/api\/v1\/?$/, '');
}

export function uploadUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path) || path.startsWith('data:')) return path;
  if (path.startsWith('/uploads/')) {
    return `${apiOrigin()}${path}`;
  }
  return path;
}

export default uploadUrl;
