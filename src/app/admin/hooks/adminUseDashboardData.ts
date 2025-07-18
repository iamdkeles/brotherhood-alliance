// src/hooks/useDashboardData.ts OR useDashboardStats.ts
import { useQuery } from "@tanstack/react-query";
import { DashboardStat } from "../types/admin-dashboard-api";
import { apiService } from "../services/api";

export const useDashboardData = (
  enabled: boolean = true,
  refetchInterval: number = 5 * 60 * 1000
) =>
  useQuery<DashboardStat[], Error>({
    queryKey: ["dashboard-stats"],
    queryFn: () => apiService.getDashboardStats(),
    enabled,
    refetchInterval,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
