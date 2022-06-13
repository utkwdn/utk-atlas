const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  /** allowing static public file to render without having to add the .html **/
  rewrites: async () => {
    return [
      {
        source: "/ittakesavolunteer",
        destination: "/ittakesavolunteer.html",
      },
    ];
  },
});
