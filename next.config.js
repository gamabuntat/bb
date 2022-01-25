const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.amcnetworks.com',
      'vignette.wikia.nocookie.net',
      's-i.huffpost.com',
      'media1.popsugar-assets.com',
      'res.cloudinary.com',
      'i.pinimg.com',
      'static.wikia.nocookie.net',
      'm.media-amazon.com',
    ],
  },
  webpack: (config) => {
    const alias = {
      ...config.resolve.alias,
      styles: path.resolve(__dirname, 'src/styles'),
      components: path.resolve(__dirname, 'src/components'),
    };

    config.resolve.alias = alias;

    return config;
  },
};
