import 'faust.config';
import { FaustProvider } from '@faustwp/core';
import React from 'react';
import 'scss/main.scss';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Montserrat, Sofia_Sans_Extra_Condensed } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

const sofia = Sofia_Sans_Extra_Condensed({
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        :root {
          --font-montserrat: ${montserrat.style.fontFamily};
          --font-sofia: ${sofia.style.fontFamily};
        }
      `}</style>
      {/* eslint-disable @typescript-eslint/no-unsafe-assignment  */}
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </>
  );
}
