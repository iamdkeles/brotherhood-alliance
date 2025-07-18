// export interface DashboardStats {
//   totalMembers: number;
//   activeMembers: number;
//   pendingApplications: number;
//   totalRevenue: number;
//   // monthlyGrowth: number;
//   // completedEvents: number;
// }

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
}

export interface DashboardStatsResponse {
  stats: DashboardStat[];
}

export interface RecentActivity {
  id: string;
  type:
    | "member_joined"
    | "application_submitted"
    | "event_completed"
    | "payment_received";
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
  metadata?: Record<string, unknown>;
}

export interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  // activities: RecentActivity[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  timestamp: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActivity: string;
  rank?: string;
}

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
  reviewDate?: string;
  reviewerId?: string;
}

// Hook return types
export interface UseDashboardDataReturn {
  stats: DashboardStat | null;
  activities: RecentActivity[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}
