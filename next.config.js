/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { isServer }) {
    // Ignore .map files during build
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
    });

    return config;
  },
};

module.exports = nextConfig;