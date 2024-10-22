/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
        domains: [
            'firebasestorage.googleapis.com',
            'courseforgebucket.s3.ap-south-1.amazonaws.com'
        ]
    }
};

export default nextConfig;
