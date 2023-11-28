/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'], // Bu array içine kullanmak istediğiniz resim servislerinin hostname'larını ekleyin
  },
}

module.exports = nextConfig
