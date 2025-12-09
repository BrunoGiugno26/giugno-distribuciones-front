/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', 
        pathname: '/uploads/**', 
      },
      {
        protocol:"https",
        hostname:"img.clerk.com",
      },
      {
        protocol:"https",
        hostname:"images-clerk.dev",
      },
      {
        protocol:"https",
        hostname:"img-clerk.com",
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
      },
      {
        protocol:"https",
        hostname:"avatars.githubusercontent.com",
      },
      /*
      {
        protocol: 'https',
        hostname: 'tudominiodeapi.com',
      },
      */
    ],
  },
};

module.exports = nextConfig;
