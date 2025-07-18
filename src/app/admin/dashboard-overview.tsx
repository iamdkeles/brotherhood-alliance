import React from "react";
import { DashboardStat } from "./types/admin-dashboard-api";

interface DashboardOverviewProps {
  stats: DashboardStat[];
  // activities: Activity[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  // activities,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-medium text-slate-900">
            Recent Activities
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-600">{activity.user}</p>
                </div>
                <div className="text-sm text-slate-500">{activity.time}</div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
