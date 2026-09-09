import fs from 'fs';
import path from 'path';

const routes = [
  '',
  '/platform',
  '/capabilities',
  '/reconciliation',
  '/anomaly-detection',
  '/transaction-lifecycle',
  '/integrations',
  '/integrations/mpesa',
  '/architecture',
  '/demo',
  '/simulator',
  '/status'
];

const domain = 'https://portal.pesaguard.com';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(r => `
    <url>
      <loc>${domain}${r}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${r === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), xml);
console.log('Successfully generated public/sitemap.xml');
