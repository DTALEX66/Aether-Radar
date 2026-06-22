/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Keep production builds deterministic on small CI/sandbox machines.
    // Next.js otherwise derives a high worker count from the host CPU count,
    // which can stall this mostly-static documentation/data app while
    // collecting page data. Override with env vars when running on stronger CI.
    cpus: Number(process.env.AETHER_NEXT_BUILD_CPUS ?? 1),
    staticGenerationMaxConcurrency: Number(process.env.AETHER_STATIC_CONCURRENCY ?? 1),
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=3600' }] },
    ];
  },
};

export default nextConfig;
