import 'faust.config';
import { FaustProvider } from '@faustwp/core';
// //import 'normalize.css/normalize.css';
import React from 'react';
import 'scss/main.scss';
import { useRouter } from 'next/router';

// // import { client } from 'client';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-unsafe-assignment  */}
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </>
  );
}

// export default function MyApp({ Component, pageProps }: AppProps) {
//   const router = useRouter();
//   console.log(router);
//   return (
//     <>
//       <FaustProvider
//         // client={client}
//         pageProps={
//           pageProps as Parameters<typeof FaustProvider>[0]['pageProps']
//         }
//       >
//         <Component {...pageProps} key={router.asPath} />
//       </FaustProvider>
//     </>
//   );
// }

// import '../faust.config';
// import React from 'react';
// import { useRouter } from 'next/router';
// import { FaustProvider } from '@faustwp/core';
// import '../styles/main.scss';
