/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // banner uploads from the dashboard (resized to ~1MB in the browser first)
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
