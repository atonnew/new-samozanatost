/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  // Отключаем Server-Side функции для статического экспорта
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

export default nextConfig
