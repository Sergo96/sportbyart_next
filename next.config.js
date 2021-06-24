const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
  // exclude: path.resolve(__dirname, 'assets/svg'),

  images: {
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    domains: [
      'localhost',
      'https://youtu.be',
      'scontent.fevn1-4.fna.fbcdn.net',
    ],

    // path: ['http://localhost:8000'],
    // loader can be 'default', 'imgix', 'cloudinary', or 'akamai'
    loader: 'default',
  },
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],

  inlineImageLimit: false,
  env: {
    customKey: 'http://localhost:8000',
  },

  webpack(config, options) {
    return config;
  },
});
