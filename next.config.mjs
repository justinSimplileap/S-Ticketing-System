/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
      },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/Dashboard',
          permanent: true,
        }
      ]
    }
};

export default nextConfig;
 