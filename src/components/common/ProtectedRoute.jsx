import { Navigate, useLocation } from 'react-router-dom';

import Loading from './Loading.jsx';
import { useAuth } from '../../hooks/useAuth.js';

/**
 * Wraps pages that require an authenticated user.
 * Redirects to /login with a `redirect` query so the user can return.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading full text="Checking your session..." />;
  }

  if (!user) {
    const redirect = encodeURIComponent(
      location.pathname + location.search
    );
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return children;
}
