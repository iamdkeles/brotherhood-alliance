import React, { useState } from "react";
import { Shield } from "lucide-react";

interface AdminLoginFormProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginForm: React.FC<AdminLoginFormProps> = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setError("");

    // Mock admin credentials
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      setIsAuthenticated(true);
    } else {
      setError("Invalid credentials. Use username: admin, password: admin123");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
          <p className="text-slate-600">Brotherhood Alliance Portal</p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong>
              <br />
              Username: <code className="bg-blue-100 px-1 rounded">admin</code>
              <br />
              Password:{" "}
              <code className="bg-blue-100 px-1 rounded">admin123</code>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
