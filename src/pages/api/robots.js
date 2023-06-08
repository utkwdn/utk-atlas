export default function handler(req, res) {
  const allowLine =
    process.env.PRIMARY_DOMAIN === 'https://www.utk.edu'
      ? 'Allow: /'
      : 'Disallow: /';
  const sitemapAddress = `${process.env.PRIMARY_DOMAIN}/sitemap.xml`;

  const robotsContent = `User-agent: *\n${allowLine}\n\nSitemap: ${sitemapAddress}`;

  res.send(robotsContent);
}
