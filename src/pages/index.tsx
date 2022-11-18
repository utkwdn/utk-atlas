import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, PageTitle, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client, PageIdType } from 'client';
//import { getArrayFields, castNotSkeleton } from 'gqty';
//import TimelineEvent from '../components/TimelineEvent';

import Hero from 'components/Hero.js';
import ParsedMarkup from 'components/ParsedMarkup';

export default function Page() {
  const { useQuery, usePage, usePosts } = client;
  const generalSettings = useQuery().generalSettings;

  //const allPages = getArrayFields(useQuery().pages().nodes, 'isFrontPage', 'id', 'slug', 'pageId', 'uri');
  //const frontPage = allPages.findIndex(x => x.isFrontPage === true);
  //const frontPageID = allPages[frontPage].slug;

  //let frontPageParts = Object.entries(allPages[frontPage]);
  //let frontPageClean = Object.fromEntries(frontPageParts);

  const frontPageContent = usePage({
    id: '/',
    idType: PageIdType.URI,
  });

  //const timelineEvents = useQuery().timelineEvents().nodes;

  const posts = usePosts({
    first: 6,
    where: {
      categoryName: 'uncategorized',
    },
  });
  //console.log(timelineEvents[0].slug);

  return (
    <>
      <Header />

      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <Hero />
      {/*  <div
    className="bg-summitt d-flex align-items-center"
    style={{ height: "60vh" }}
  >
    <h1 className="text-center">Hero Area Here</h1>
  </div>
  */}

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
    client,
  });
}
