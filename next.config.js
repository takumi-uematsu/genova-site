/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Mount the entire app under /company so it lives at z-data.io/company
  basePath: "/company",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
