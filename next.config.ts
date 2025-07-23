const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const config = async () => {
  const withPWAConfig = (await import("next-pwa")).default;

  const withPWA = withPWAConfig({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: isDev,

    // Production-only settings
    ...(isProd && {
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "offlineCache",
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    }),
  });

  return withPWA(nextConfig);
};

export default config;
