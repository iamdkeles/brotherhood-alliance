// types/next-pwa.d.ts
declare module "next-pwa" {
  import { NextConfig } from "next";

  interface PWAOptions {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    fallbacks?: {
      image?: string;
      document?: string;
      audio?: string;
      video?: string;
    };
    [key: string]: unknown;
  }

  function withPWA(
    pwaOptions: PWAOptions
  ): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
