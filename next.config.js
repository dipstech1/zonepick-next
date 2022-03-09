/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'https://reqres.in/api/login' // development api
        : 'http://localhost:3000/api' // production api
}
}

module.exports = nextConfig
