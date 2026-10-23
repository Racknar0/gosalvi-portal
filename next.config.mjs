/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [{ source: '/', destination: '/usuarios', permanent: false }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
