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
      {
        source: '/mobile/alpha',
        destination: '/alpha',
      },
      {
        source: '/mobile/contact',
        destination: '/contact',
      },
      {
        source: '/aboutut',
        destination: '/about',
      },
      {
        source: '/aboutut/numbers',
        destination: '/about/numbers',
      },
      {
        source: '/aboutut/knoxville',
        destination: '/about/knoxville',
      },
      {
        source: '/apply',
        destination: 'https://admissions.utk.edu/apply/',
      },
      {
        source: '/tours',
        destination: 'https://admissions.utk.edu/visit/',
      },
      {
        source: '/visit',
        destination: 'https://admissions.utk.edu/visit/',
      },
    ];
  },

  // redirects without masking url
  redirects: async () => {
    return [
      {
        source: '/meet',
        destination:
          '/meet.html?utm_campaign=meet-ut-2022&utm_id=0&utm_medium=direct-mail&utm_source=meet-mailer-2022',
        permanent: true,
      },
      {
        source: '/research',
        destination: 'https://research.utk.edu/',
        permanent: true,
      },
      {
        source: '/diversity',
        destination: 'https://diversity.utk.edu/',
        permanent: true,
      },
      {
        source: '/status',
        destination: 'https://safety.utk.edu/status/',
        permanent: true,
      },
      {
        source: '/mobile/dining',
        destination: 'https://ut.campusdish.com/',
        permanent: true,
      },
      {
        source: '/utalert',
        destination: 'https://safety.utk.edu/ut-alert/',
        permanent: true,
      },
      {
        source: '/volunteer_stories',
        destination: 'https://volunteerstories.utk.edu',
        permanent: true,
      },
      {
        source: '/coronavirus',
        destination: 'https://studenthealth.utk.edu/covid-19',
        permanent: true,
      },
      {
        source: '/history',
        destination: 'https://timeline.utk.edu/',
        permanent: true,
      },
      {
        source: '/therock',
        destination: 'https://therock.utk.edu/',
        permanent: true,
      },
      {
        source: '/give',
        destination:
          'https://securelb.imodules.com/s/1341/utaa/form/19/form.aspx?sid=1341&gid=2&pgid=3204&cid=4841&src=giveto/',
        permanent: false,
      },
    ];
  },
});
