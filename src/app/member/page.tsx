"use client";

import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Download,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  FileText,
  Users,
  Shield,
  Award,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Login from "@/components/Login";

export default function MemberPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: "Marcus Thompson",
    email: "marcus.thompson@email.com",
    phone: "+1 (555) 123-4567",
    memberId: "BA-2019-0147",
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  };

  const handleProfileChange = (
    field: keyof typeof profileData,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    console.log("Saving profile:", profileData);
    // Show success message or handle response
  };

  const handleCancelProfile = () => {
    // Reset to original values
    setProfileData({
      fullName: "Marcus Thompson",
      email: "marcus.thompson@email.com",
      phone: "+1 (555) 123-4567",
      memberId: "BA-2019-0147",
    });
  };

  // Mock data
  const upcomingEvents = [
    {
      id: 1,
      title: "Brotherhood Retreat",
      date: "2025-08-15",
      time: "9:00 AM",
      location: "Mountain Lodge",
    },
    {
      id: 2,
      title: "Mentorship Circle",
      date: "2025-08-20",
      time: "7:00 PM",
      location: "Chapter House",
    },
    {
      id: 3,
      title: "Leadership Summit",
      date: "2025-09-10",
      time: "10:00 AM",
      location: "Grand Hall",
    },
  ];

  const resources = [
    { id: 1, title: "Brotherhood Handbook", type: "PDF", size: "2.4 MB" },
    { id: 2, title: "Code of Ethics", type: "PDF", size: "854 KB" },
    { id: 3, title: "Annual Report 2024", type: "PDF", size: "5.2 MB" },
    { id: 4, title: "Member Directory", type: "Excel", size: "1.1 MB" },
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Welcome New Members - July 2025",
      author: "Elder Marcus",
      replies: 12,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Upcoming Retreat Preparation",
      author: "Guardian James",
      replies: 8,
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Monthly Challenge Discussion",
      author: "Brother Alex",
      replies: 15,
      time: "1 day ago",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Login onMemberLoginSuccess={handleLoginSuccess} defaultMode="member" />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with User Info and Logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-sky-600 rounded-lg flex items-center justify-center mr-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Brotherhood Alliance
              </h1>
              <p className="text-xs text-slate-600">Member Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm p-4">
              <div className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Calendar },
                  { id: "resources", label: "Resources", icon: Download },
                  { id: "forum", label: "Forum", icon: MessageCircle },
                  { id: "profile", label: "Profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-sky-50 text-sky-700 border-r-2 border-sky-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, Brother Marcus
                  </h2>
                  <p className="text-sky-100">
                    Stay connected with your brotherhood and upcoming events.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-2 bg-sky-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-sky-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-600">
                          Upcoming Events
                        </p>
                        <p className="text-2xl font-bold text-slate-900">3</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-600">Active Members</p>
                        <p className="text-2xl font-bold text-slate-900">247</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-slate-600">Your Rank</p>
                        <p className="text-2xl font-bold text-slate-900">
                          Guardian
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Upcoming Events
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-slate-900">
                              {event.title}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {event.date} at {event.time}
                            </p>
                            <p className="text-sm text-slate-500">
                              {event.location}
                            </p>
                          </div>
                          <button className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors">
                            RSVP
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Resource Downloads
                    </h3>
                    <p className="text-slate-600">
                      Access important documents and materials
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="p-2 bg-sky-100 rounded-lg mr-4">
                              <FileText className="h-5 w-5 text-sky-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900">
                                {resource.title}
                              </h4>
                              <p className="text-sm text-slate-600">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <button className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 rounded-lg transition-colors">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "forum" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Internal Forum
                        </h3>
                        <p className="text-slate-600">
                          Connect and discuss with fellow members
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors">
                        New Post
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {forumPosts.map((post) => (
                        <div
                          key={post.id}
                          className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-slate-900 mb-2">
                                {post.title}
                              </h4>
                              <p className="text-sm text-slate-600">
                                By {post.author} • {post.time}
                              </p>
                            </div>
                            <div className="text-sm text-slate-500">
                              {post.replies} replies
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Member Profile
                    </h3>
                    <p className="text-slate-600">
                      Manage your personal information
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="h-20 w-20 bg-sky-600 rounded-full flex items-center justify-center">
                          <User className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900">
                            {profileData.fullName}
                          </h4>
                          <p className="text-slate-600">
                            Guardian • Member since 2019
                          </p>
                          <p className="text-sm text-slate-500">
                            Chapter: Northern Division
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            value={profileData.fullName}
                            onChange={(e) =>
                              handleProfileChange("fullName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              handleProfileChange("email", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) =>
                              handleProfileChange("phone", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Member ID
                          </label>
                          <Input
                            type="text"
                            value={profileData.memberId}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelProfile}
                        >
                          Cancel
                        </Button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
