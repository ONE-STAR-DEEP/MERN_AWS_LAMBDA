/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongoose'], // ✅ moved to root level

  images: {
    domains: ['lh3.googleusercontent.com', 'natura-images.s3.ap-south-1.amazonaws.com',],
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;