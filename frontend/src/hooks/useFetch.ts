import { useState, useEffect, useCallback } from 'react';
import type { AxiosResponse } from 'axios';

export function useFetch<T>(
  fetcher: () => Promise<AxiosResponse<{ success: boolean; data: T }>>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res.data.data);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
