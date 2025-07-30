import React from "react";
import { Home, Users, FileText, BarChart3, Settings } from "lucide-react";

interface AdminSidebarNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SidebarNavigation: React.FC<AdminSidebarNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "members", label: "Members", icon: Users },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                  activeTab === item.id
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
