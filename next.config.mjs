/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    // Disable Turbopack to avoid memory issues
    turbo: false,
};

export default nextConfig;
