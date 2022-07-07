/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["ecom-all-content.s3.ap-south-1.amazonaws.com", "thumbs.dreamstime.com"],
  },
  publicRuntimeConfig: {
    apiUrl: "https://jkv60g7gzg.execute-api.ap-south-1.amazonaws.com/dev/", // development api
    currency: "USD",
    lang: "en-IN",
  },
};

module.exports = nextConfig;
