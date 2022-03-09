/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'https://wb94xm7q2j.execute-api.ap-south-1.amazonaws.com/dev/' // development api
        : 'http://localhost:3000/api' // production api
}
}

module.exports = nextConfig
