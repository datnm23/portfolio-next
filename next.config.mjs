/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static HTML export for GitHub Pages
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
