import { setConfig } from '@faustwp/core';
import possibleTypes from '../possibleTypes.json';
import templates from './wp-templates';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [],
  possibleTypes,
});

// if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
//   console.error(
//     'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?'
//   );
// }

// /**
//  * @type {import("@faustjs/core").Config}
//  */
// export default coreConfig({
//   wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
//   apiClientSecret: process.env.FAUSTWP_SECRET_KEY,
// });
