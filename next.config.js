/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: 'https://dvzdg005z5.execute-api.us-east-1.amazonaws.com/prod'
  }
}

module.exports = nextConfig
