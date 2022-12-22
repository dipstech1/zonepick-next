/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['ecom-all-content.s3.ap-south-1.amazonaws.com', 'thumbs.dreamstime.com'],
  },
  publicRuntimeConfig: {
    apiUrl: 'https://1ncxn28uw6.execute-api.ap-south-1.amazonaws.com/dev/', // development api
    currency: 'INR',
    lang: 'en-IN',
  },

  /* exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/category': { page: '/category'},
      '/contact': { page: '/contact' },
      '/sellers': { page: '/sellers' },
      '/testing-page/mobile-list': { page: '/testing-page/mobile-list'},

     // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  }*/
};

module.exports = nextConfig;
