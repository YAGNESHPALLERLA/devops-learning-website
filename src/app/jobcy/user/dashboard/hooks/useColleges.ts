import { useState, useEffect, useCallback } from 'react';

interface College {
  value: string;
  label: string;
  state: string;
  category: string;
}

interface CollegesResponse {
  colleges: College[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  filters: {
    search: string;
    state: string;
    category: string;
  };
}

interface UseCollegesOptions {
  search?: string;
  state?: string;
  category?: string;
  limit?: number;
  offset?: number;
  enabled?: boolean;
}

export function useColleges(options: UseCollegesOptions = {}) {
  const {
    search = '',
    state = '',
    category = '',
    limit = 50,
    offset = 0,
    enabled = true
  } = options;

  const [data, setData] = useState<CollegesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchColleges = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (state) params.append('state', state);
      if (category) params.append('category', category);
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      const response = await fetch(`/api/jobcy/colleges?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: CollegesResponse = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch colleges';
      setError(errorMessage);
      console.error('Error fetching colleges:', err);
    } finally {
      setLoading(false);
    }
  }, [search, state, category, limit, offset, enabled]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return {
    data,
    loading,
    error,
    refetch: fetchColleges
  };
}

// Hook for searching colleges with debouncing
export function useCollegeSearch(initialSearch = '', debounceMs = 300) {
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [search, debounceMs]);

  const { data, loading, error } = useColleges({
    search: debouncedSearch,
    limit: 100 // Show more results for search
  });

  return {
    search,
    setSearch,
    colleges: data?.colleges || [],
    loading,
    error,
    total: data?.pagination.total || 0
  };
}
