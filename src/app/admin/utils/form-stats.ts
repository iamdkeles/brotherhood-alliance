// import { DashboardStat } from "../types/admin-dashboard-api";

// export function formatStats(stats?: DashboardStat): DashboardStat[] {
//   if (!stats) return [];

//   return [
//     {
//       title: "Total Members",
//       value: stats.totalMembers?.toString() ?? "0",
//       change: "+5%", // Update with dynamic change if available
//       changeType: "positive",
//     },
//     {
//       title: "Active Members",
//       value: stats.activeMembers?.toString() ?? "0",
//       change: "+2%",
//       changeType: "positive",
//     },
//     {
//       title: "Pending Applications",
//       value: stats.pendingApplications?.toString() ?? "0",
//       change: "-1%",
//       changeType: "negative",
//     },
//     {
//       title: "Total Revenue",
//       value: `$${stats.totalRevenue?.toLocaleString() ?? "0"}`,
//       change: "+10%",
//       changeType: "positive",
//     },
//     {
//       title: "Monthly Growth",
//       value: `${stats.monthlyGrowth?.toFixed(1) ?? "0"}%`,
//       change: "+1.2%",
//       changeType: "positive",
//     },
//     {
//       title: "Completed Events",
//       value: stats.completedEvents?.toString() ?? "0",
//       change: "0%",
//       changeType: "negative",
//     },
//   ];
// }
