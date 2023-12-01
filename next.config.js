/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/login",
      },
      {
        source: "/main",
        destination: "/pickup_lane",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/pickup_lane",
        destination: "/main",
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
