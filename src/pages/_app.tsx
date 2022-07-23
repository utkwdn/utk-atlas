import 'faust.config';
import { FaustProvider } from '@faustjs/next';
//import 'normalize.css/normalize.css';
import React from 'react';
import 'scss/main.scss';

import { client } from 'client';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* used in `SiteSearch.tsx` */}
      <Script src="https://cse.google.com/cse.js?cx=da48cf0836de1c946" />
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}
