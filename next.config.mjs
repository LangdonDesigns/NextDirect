/** @type {import('next').NextConfig} */
const nextConfig = {
  //experimental: {
   // middleware: true,
  //},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    return config;
  },
};

export default nextConfig;
