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
      {/* used in `SiteSearch.tsx`. Loading beforeInteractive to insure 404 page search works */}
      <Script
        src="https://cse.google.com/cse.js?cx=da48cf0836de1c946"
        strategy="beforeInteractive"
        onReady={() => console.log('Google CSE Loaded')}
      />
      <FaustProvider
        client={client}
        pageProps={
          pageProps as Parameters<typeof FaustProvider>[0]['pageProps']
        }
      >
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}
