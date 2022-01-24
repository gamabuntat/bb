/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const alias = {
      ...config.resolve.alias,  
      'styles': path.resolve(__dirname, 'src/styles'),
      'components': path.resolve(__dirname, 'src/components'),
    };

    config.resolve.alias = alias;

    return config;
  },
};

module.exports = nextConfig
