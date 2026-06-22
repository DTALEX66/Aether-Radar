import type { MetadataRoute } from 'next';
import { entities } from '../lib/data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/tools', '/terms', '/github', '/risks', '/scenarios', '/compare', '/competitors', '/exports', '/about', '/legal', '/status', '/ui', '/ui-generator', '/standards', '/api-docs', '/stack', '/report', '/admin', '/deploy', '/pricing', '/enterprise', '/privacy', '/terms-of-service'];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date('2026-06-21') })),
    ...entities.map((entity) => ({ url: `${baseUrl}/tools/${entity.id}`, lastModified: new Date(entity.lastVerifiedAt) })),
  ];
}
