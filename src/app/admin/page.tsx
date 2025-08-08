"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  Shield,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

import ApplicationsPanel from "./components/application-panel";
import DashboardOverview from "./components/dashboard-overview";
import MemberManagement from "./components/member-management";
import { AnalyticsPanel } from "./components/panel-components";
import SidebarNavigation from "./childComponents/sidebar-navigation";
import SystemSettingsPanel from "./components/system-setting-panel";
import { useDashboardData } from "./hooks/adminUseDashboardData";
import Login from "@/components/Login";

// Loading Spinner
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    <span className="ml-3 text-slate-600">Loading...</span>
  </div>
);

// Error Message
const ErrorDisplay: React.FC<{ message: string; onRetry: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="bg-red-50 border border-red-200 rounded-md p-4">
    <div className="flex items-center justify-between">
      <p className="text-red-800">Error: {message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  </div>
);

// User Menu Component
const UserMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 focus:outline-none rounded-md p-2"
      >
        <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          EA
        </div>
        <div className="hidden sm:block text-left">
          <p className="font-medium text-slate-900 text-sm">
            Elder Administrator
          </p>
          <p className="text-slate-600 text-xs">Supreme Elder</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-slate-900 border-b border-slate-200">
              <p className="font-medium">Elder Administrator</p>
              <p className="text-slate-600">Supreme Elder</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                // Add profile functionality here
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                // Add settings functionality here
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </button>
            <div className="border-t border-slate-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    console.log("Checking admin authentication...");
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    console.log("Admin logged in status:", adminLoggedIn);
    setIsAuthenticated(adminLoggedIn);
    setIsInitializing(false);
  }, []);

  const handleAdminLogin = (isAuth: boolean) => {
    console.log("Admin login handler called with:", isAuth);
    setIsAuthenticated(isAuth);
  };

  const handleLogout = () => {
    console.log("Admin logging out...");
    localStorage.removeItem("adminLoggedIn");
    setIsAuthenticated(false);
  };

  const { data, isLoading, error, refetch } = useDashboardData(
    isAuthenticated && activeTab === "dashboard"
  );

  // Show loading while initializing authentication
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onAdminLoginSuccess={handleAdminLogin} defaultMode="admin" />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  <span className="hidden sm:inline">
                    Brotherhood Alliance -{" "}
                  </span>
                  Admin Portal
                </h1>
                <p className="text-xs text-slate-600 hidden sm:block">
                  Administrative Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <UserMenu onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black opacity-80"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center mr-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-slate-900">Admin Portal</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <SidebarNavigation
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <SidebarNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
              {activeTab === "dashboard" && (
                <div>
                  {isLoading && <LoadingSpinner />}
                  {error && (
                    <ErrorDisplay message={error.message} onRetry={refetch} />
                  )}
                  {!isLoading && !error && data && (
                    <DashboardOverview
                      stats={data || []}
                      // activities={formatActivities(data.activities)}
                    />
                  )}
                </div>
              )}

              {activeTab === "members" && <MemberManagement />}
              {activeTab === "applications" && <ApplicationsPanel />}
              {activeTab === "analytics" && <AnalyticsPanel />}
              {activeTab === "settings" && <SystemSettingsPanel />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
