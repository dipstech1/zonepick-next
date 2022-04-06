/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['ecom-all-content.s3.ap-south-1.amazonaws.com',"thumbs.dreamstime.com"],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'https://wb94xm7q2j.execute-api.ap-south-1.amazonaws.com/dev/' 
        // ? 'https://jkv60g7gzg.execute-api.ap-south-1.amazonaws.com/dev/' // development api
        : 'http://localhost:3000/api' // production api
}
}

module.exports = nextConfig
