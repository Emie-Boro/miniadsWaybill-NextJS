/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',  // Match any URL starting with /api/
            destination: 'https://miniadswaybill-api.onrender.com/api/:path*' // Proxy to Backend
          },
        //   {
        //     source: '/api/:path*',  // Match any URL starting with /api/
        //     destination: 'http://localhost:8080/api/:path*' // Proxy to Backend
        //   },

        ];
    }
};

export default nextConfig;
