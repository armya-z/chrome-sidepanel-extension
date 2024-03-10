/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true, output: 'export',distDir: 'out',skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self';connect-src 'self' https://api.deepseek.com/v1/chat/completions;script-src 'self' 'unsafe-eval'; object-src 'none' ;style-src 'self' 'unsafe-inline' ",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
