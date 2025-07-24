/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

module.exports = nextConfig;
