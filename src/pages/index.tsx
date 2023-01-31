import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, PageTitle, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client, PageIdType } from 'client';
import parse from 'html-react-parser';
import Hero from 'components/Hero.js';
import ParsedMarkup from 'components/ParsedMarkup';

export default function Page() {
  const { useQuery, usePage, usePosts } = client;
  const generalSettings = useQuery().generalSettings;

  const frontPageContent = usePage({
    id: '/',
    idType: PageIdType.URI,
  });

  const yoastHead = parse(frontPageContent?.seo?.fullHead || '');

  const posts = usePosts({
    first: 6,
    where: {
      categoryName: 'uncategorized',
    },
  });

  return (
    <>
      <Header />

      <Head>{yoastHead}</Head>
      <Hero />

      <div className="container-fluid">
        <main id="content">
          <div className="entry-content container-xxl">
            <ParsedMarkup content={frontPageContent?.content?.() || ''} />
          </div>
        </main>
      </div>

      <Footer copyrightHolder={generalSettings?.title || undefined} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    // Refresh WP content after 2 min. Default is 900 seconds (15 min.)
    revalidate: 120,
    client,
  });
}
