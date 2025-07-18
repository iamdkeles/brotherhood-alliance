// src/services/api.ts
import {
  ApiError,
  ApiResponse,
  Application,
  DashboardData,
  DashboardStat,
  Member,
} from "../types/admin-dashboard-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("Making API call to:", url);

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        const fallbackError: ApiError = {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
          code: response.status.toString(),
          timestamp: new Date().toISOString(),
        };

        const errorData: ApiError = await response
          .json()
          .catch(() => fallbackError);
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const json = await response.json();
      return (json as ApiResponse<T>).data ?? json;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw new Error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  }

  // Dashboard APIs
  async getDashboardData(): Promise<DashboardData> {
    const stats = await this.getDashboardStats();
    return {
      stats,
    };
  }

  async getDashboardStats(): Promise<DashboardStat[]> {
    const response = await this.makeRequest<{ stats: DashboardStat[] }>(
      "/dashboard/stats"
    );
    return response.stats;
  }

  // async getRecentActivities(): Promise<DashboardData["activities"]> {
  //   return this.makeRequest("/dashboard/activities");
  // }

  // Member APIs
  async getMembers(): Promise<Member[]> {
    return this.makeRequest<Member[]>("/members");
  }

  async getMember(id: string): Promise<Member> {
    return this.makeRequest<Member>(`/members/${id}`);
  }

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    return this.makeRequest<Member>(`/members/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteMember(id: string): Promise<void> {
    return this.makeRequest<void>(`/members/${id}`, {
      method: "DELETE",
    });
  }

  // Application APIs
  async getApplications(): Promise<Application[]> {
    return this.makeRequest<Application[]>("/applications");
  }

  async getApplication(id: string): Promise<Application> {
    return this.makeRequest<Application>(`/applications/${id}`);
  }

  async updateApplicationStatus(
    id: string,
    status: "approved" | "rejected"
  ): Promise<Application> {
    return this.makeRequest<Application>(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  // Auth APIs
  async login(credentials: {
    username: string;
    password: string;
  }): Promise<unknown> {
    return this.makeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<void> {
    return this.makeRequest("/auth/logout", {
      method: "POST",
    });
  }
}

// Singleton instance
export const apiService = new ApiService();

// Named exports for convenience
export const {
  getDashboardData,
  getDashboardStats,
  // getRecentActivities,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
  getApplications,
  getApplication,
  updateApplicationStatus,
  login,
  logout,
} = apiService;
