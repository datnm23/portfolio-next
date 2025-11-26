/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static HTML export for GitHub Pages
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    // Disable Turbopack to avoid memory issues
    turbo: false,
};

export default nextConfig;
