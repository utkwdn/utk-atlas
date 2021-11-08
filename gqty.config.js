require('dotenv-flow').config();

/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: `https://utkdigitalcomm.wpengine.com/graphql`,
    headers: {},
  },
  destination: './src/client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

console.log(`Using "${config.introspection.endpoint}" to generate schema...`);

module.exports = config;
