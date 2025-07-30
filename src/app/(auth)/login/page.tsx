"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    const memberLoggedIn = localStorage.getItem("memberLoggedIn") === "true";

    if (adminLoggedIn) {
      router.push("/admin");
      return;
    }

    if (memberLoggedIn) {
      router.push("/member"); // or wherever members should go
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleMemberLoginSuccess = () => {
    router.push("/member"); // Redirect to member dashboard
  };

  const handleAdminLoginSuccess = (value: boolean) => {
    if (value) {
      router.push("/admin"); // Redirect to admin dashboard
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Login
      onMemberLoginSuccess={handleMemberLoginSuccess}
      onAdminLoginSuccess={handleAdminLoginSuccess}
      defaultMode="member"
    />
  );
}
