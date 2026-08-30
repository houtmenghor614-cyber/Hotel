import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import authApi from '../api/authApi.js';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // On mount, if a token exists, fetch the current user.
  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setLoading(false);
      return undefined;
    }
    (async () => {
      try {
        const { data } = await authApi.getMe();
        if (!cancelled) setUser(data);
      } catch {
        // Token invalid/expired — clear it.
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        if (!cancelled) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback(async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
    setToken(data.access_token);
    const me = await authApi.getMe();
    setUser(me.data);
    return me.data;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await authApi.register(payload);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((nextUser) => {
    setUser(nextUser);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout, updateUser }),
    [user, token, loading, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
