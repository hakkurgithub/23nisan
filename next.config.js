 /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ... projenizin diğer ayarları burada olabilir

  // --- BU BÖLÜMÜ EKLEYİN ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/media/**', // Resimlerinizin /media/ klasöründe olduğunu varsayarak
      },
    ],
  },
  // --- EKLEME BİTTİ ---
};

module.exports = nextConfig;