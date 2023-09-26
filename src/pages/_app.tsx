import 'faust.config';
import { FaustProvider } from '@faustwp/core';
import React from 'react';
import 'scss/main.scss';
import { useRouter } from 'next/router';
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
