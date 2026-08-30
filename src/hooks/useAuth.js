import { createContext, useContext } from 'react';

import { AuthContext } from '../context/AuthContext.jsx';

/** Convenience hook to consume the AuthContext. */
export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
