/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            },
            {
                protocol: 'https',
                hostname: 'kindly-gnat-44.convex.cloud',
            },
            {
                protocol: 'https',
                hostname: 'https://kindly-gnat-44.convex.site'
            }
        ]
    }
};

export default nextConfig;
