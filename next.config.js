const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    domains: ['images.utk.edu'],
  },
  /** allowing static public file to render without having to add the .html **/
  rewrites: async () => {
    return [
      {
        source: '/ittakesavolunteer',
        destination: '/ittakesavolunteer.html',
      },
      {
        source: '/meet',
        destination: '/meet.html',
      },
    ];
  },
});
