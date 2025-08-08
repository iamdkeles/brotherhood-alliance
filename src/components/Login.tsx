"use client";
import React, { useState } from "react";
import { Shield, User, UserCheck } from "lucide-react";

interface LoginProps {
  onMemberLoginSuccess?: () => void;
  onAdminLoginSuccess?: (value: boolean) => void;
  defaultMode?: "member" | "admin";
}

const Login: React.FC<LoginProps> = ({
  onMemberLoginSuccess,
  onAdminLoginSuccess,
  defaultMode = "member",
}) => {
  const [loginMode, setLoginMode] = useState<"member" | "admin">(defaultMode);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success" | "info";
    message: string;
  } | null>(null);

  const handleLogin = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setLoading(true);
    setAlert(null);

    const CREDENTIALS = {
      member: {
        username: "member123",
        password: "brotherhood2025",
      },
      admin: {
        username: "admin",
        password: "admin123",
      },
    };

    setTimeout(() => {
      try {
        const validCredentials = CREDENTIALS[loginMode];

        if (
          credentials.username === validCredentials.username &&
          credentials.password === validCredentials.password
        ) {
          setAlert({ type: "success", message: "Login successful!" });

          // Set localStorage for persistence
          // Simulate a successful login action
          if (loginMode === "admin") {
            localStorage.setItem("adminLoggedIn", "true");
          } else {
            localStorage.setItem("memberLoggedIn", "true");
          }

          setTimeout(() => {
            if (loginMode === "member" && onMemberLoginSuccess) {
              onMemberLoginSuccess();
            } else if (loginMode === "admin" && onAdminLoginSuccess) {
              onAdminLoginSuccess(true);
            }
          }, 1000);
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        console.error("Login error:", err);
        setAlert({ type: "error", message: "Invalid username or password" });
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const switchMode = (mode: "member" | "admin") => {
    setLoginMode(mode);
    setCredentials({ username: "", password: "" });
    setAlert(null);
  };

  const isMemberMode = loginMode === "member";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div
            className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
              isMemberMode ? "bg-sky-600" : "bg-red-600"
            }`}
          >
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            THE BROTHERHOOD
          </h1>
          <h2
            className={`text-xl font-semibold mb-2 ${
              isMemberMode ? "text-sky-600" : "text-red-600"
            }`}
          >
            ALLIANCE
          </h2>
          <p className="text-slate-600">
            {isMemberMode ? "Member Portal Access" : "Admin Portal Access"}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => switchMode("member")}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isMemberMode
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Member Login
          </button>
          <button
            onClick={() => switchMode("admin")}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isMemberMode
                ? "bg-red-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Admin Login
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
            {isMemberMode ? "Member Login" : "Admin Login"}
          </h3>

          <div className="space-y-6">
            {alert && (
              <div
                className={`p-4 rounded-lg ${
                  alert.type === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : alert.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {alert.message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                onKeyPress={handleKeyPress}
                placeholder="Enter your username"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                  isMemberMode ? "focus:ring-sky-500" : "focus:ring-red-500"
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                  isMemberMode ? "focus:ring-sky-500" : "focus:ring-red-500"
                }`}
                required
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                isMemberMode
                  ? "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500"
                  : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              }`}
            >
              {loading
                ? "Authenticating..."
                : `Login to ${isMemberMode ? "Member" : "Admin"} Portal`}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 mt-2">
              Forgot your credentials?
              <a
                href="#"
                className={`font-medium ml-1 ${
                  isMemberMode
                    ? "text-sky-600 hover:text-sky-700"
                    : "text-red-600 hover:text-red-700"
                }`}
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
