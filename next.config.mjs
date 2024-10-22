/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    images:{
        unoptimized:true,
    },
    images:{
        domains:['firebasestorage.googleapis.com']
    }
};

export default nextConfig;
