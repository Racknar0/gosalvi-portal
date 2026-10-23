/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backend = process.env.BACKEND_INTERNAL_URL || (process.env.NODE_ENV === 'production' ? 'http://172.19.0.1:3201' : 'http://127.0.0.1:4000');
    return [{ source: '/api/:path*', destination: `${backend}/api/:path*` }];
  },
  async headers() {
    return ['/verificar-correo', '/restablecer-password'].map((source) => ({ source, headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }, { key: 'Cache-Control', value: 'no-store' }] }));
  },
  redirects() {
    return [{ source: '/', destination: '/usuarios', permanent: false }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
