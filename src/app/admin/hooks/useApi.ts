// hooks/useApi.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { UseApiReturn } from "../types/admin-dashboard-api";

export const useApi = <T>(
  apiFunction: () => Promise<T>,
  enabled: boolean = true,
  refreshInterval?: number
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFunction();

      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      console.error("API call failed:", err);

      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [apiFunction, enabled]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  // Set up refresh interval
  useEffect(() => {
    if (enabled && refreshInterval && refreshInterval > 0) {
      intervalRef.current = setInterval(fetchData, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [enabled, refreshInterval, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

// Specific hooks using the generic useApi hook
export const useMembers = (enabled: boolean = true) => {
  return useApi(
    () => import("../services/api").then((m) => m.getMembers()),
    enabled
  );
};

export const useApplications = (enabled: boolean = true) => {
  return useApi(
    () => import("../services/api").then((m) => m.getApplications()),
    enabled
  );
};

export const useMember = (id: string, enabled: boolean = true) => {
  return useApi(
    () => import("../services/api").then((m) => m.getMember(id)),
    enabled && !!id
  );
};
