import { useCallback, useEffect, useState } from 'react';

/**
 * Simple data fetching hook.
 *   const { data, loading, error, refetch } = useFetch(fetcher, [deps]);
 * `fetcher` must return a promise that resolves to the response data.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}

export default useFetch;
