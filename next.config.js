const { withFaust } = require('@faustjs/next');

// Wiring up Redirection plugin to work with Next
async function fetchWordPressRedirects() {
  if (
    !process.env.WORDPRESS_USERNAME ||
    !process.env.WORDPRESS_PASSWORD ||
    !process.env.REDIRECTION_API_ENDPOINT
  ) {
    return [];
  }

  const base64UsernamePasswordToken = Buffer.from(
    process.env.WORDPRESS_USERNAME + ':' + process.env.WORDPRESS_PASSWORD
  ).toString('base64');

  const resp = await fetch(process.env.REDIRECTION_API_ENDPOINT, {
    headers: {
      Authorization: `Basic ${base64UsernamePasswordToken}`,
    },
  });
  const data = await resp.json();

  if (!Array.isArray(data.items)) {
    return [];
  }

  return data.items
    .filter((redirection) => redirection.action_type === 'url')
    .map((redirection) => ({
      source: redirection.url,
      destination: redirection.action_data.url,
      permanent: redirection.action_code === 301,
    }));
}

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    domains: ['images.utk.edu', 'content.cms.utk.edu'],
  },
  /** allowing static public file to render without having to add the .html **/
  // redirects with masked url
  rewrites: async () => {
    return [
      {
        source: '/ittakesavolunteer',
        destination: '/ittakesavolunteer.html',
      },
      {
        source: '/vision',
        destination: '/vision.html',
      },
      {
        source: '/social/hashtags',
        destination: '/hashtags',
      },
      {
        source: '/social/emojis',
        destination: '/emojis',
      },
    ];
  },

  async redirects() {
    const wordPressRedirects = await fetchWordPressRedirects();
    return wordPressRedirects;
  },
});
