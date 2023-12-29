/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
        protocol: "https",
      }
    ]
  }
}

module.exports = nextConfig
