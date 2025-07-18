// utils/formatRecentActivities.ts
import { RecentActivity } from "../types/admin-dashboard-api";

export const formatActivities = (activities: RecentActivity[]) => {
  return activities.map((activity) => ({
    id: Number(activity.id),
    action: activity.description, // or activity.type if you prefer
    user: activity.userName ?? "Unknown User",
    time: new Date(activity.timestamp).toLocaleString(),
  }));
};
