/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        pathname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
