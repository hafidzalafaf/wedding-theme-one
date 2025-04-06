import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Contoh opsi konfigurasi
  eslint: {
    ignoreDuringBuilds: true,  // Abaikan error ESLint saat build
  },
  // Tambahkan opsi konfigurasi lainnya di sini
};

export default nextConfig;