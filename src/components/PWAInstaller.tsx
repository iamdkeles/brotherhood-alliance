"use client";

import { useEffect } from "react";

export default function PWAInstaller() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("SW registered: ", registration);
        } catch (error) {
          console.log("SW registration failed: ", error);
        }
      };

      registerSW();
    }
  }, []); // Empty dependency array

  return null; // This component doesn't render anything
}
