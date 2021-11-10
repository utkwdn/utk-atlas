import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, Hero, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client, PageIdType, TagIdType } from 'client';
//import { getArrayFields, castNotSkeleton } from 'gqty';
import TimelineEvent from '../components/TimelineEvent';
import TaggedPage from '../components/TaggedPage';


export default function Page() {
  const { useQuery, usePage } = client;
  const generalSettings = useQuery().generalSettings;
  
  //const allPages = getArrayFields(useQuery().pages().nodes, 'isFrontPage', 'id', 'slug', 'pageId', 'uri');
  //const frontPage = allPages.findIndex(x => x.isFrontPage === true);
  //const frontPageID = allPages[frontPage].slug;

  //let frontPageParts = Object.entries(allPages[frontPage]);
	//let frontPageClean = Object.fromEntries(frontPageParts);

  const frontPageContent = usePage({
    id: "/",
    idType: PageIdType.URI,
  });

  const timelineEvents = useQuery().timelineEvents().nodes;
  const pagesTagged = useQuery().tag( {id: 'test-tag', idType: TagIdType.SLUG} ).contentNodes;

  //console.log(pagesTagged()?.nodes);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

	<div id="page">
      <main className="content">
        <article 
			id="post-41" 
			className="post-41 page type-page status-publish hentry"
		>
			<div className="bg-light pt-5 alignfull">
			  <div className="container-xxl">
			    <div className="row no-gutters mb-3 pb-3">
			      <header className="entry-header col-12"><h1 className="entry-title">{frontPageContent?.title()}</h1></header>
					</div>
				</div>
			</div>
			<div className="entry-content container-xxl" dangerouslySetInnerHTML={{ __html: frontPageContent?.content() }} />
		</article>
        <section className={styles.explore}>
          <div className="wrap">
            <h2>Explore this Example Project</h2>
            <p>
              This headless example project uses{' '}
              <a href="https://nextjs.org/">Next.js</a>,{' '}
              <a href="https://graphql.org/">GraphQL</a>,{' '}
              <a href="https://gqty.dev">GQty</a> and the{' '}
              <a href="https://github.com/wpengine/faustjs">
                WP&nbsp;Engine headless packages
              </a>{' '}
              for WordPress integration. Dive in and edit this template at{' '}
              <code>src/pages/index.tsx</code> or discover more below.
            </p>
            <div className={styles.features}>

              <div className={styles.feature}>
              <h2>Timeline Events</h2>

              {timelineEvents.map((timelineEvent) => (
                <TimelineEvent key={timelineEvent?.id} timelineEvent={timelineEvent} />
              ))
              }
              </div>
            </div>
            <div className={styles.features}>

              <div className={styles.feature}>
              <h2>Test Tag</h2>
              {pagesTagged().nodes.map((thing) => (
                <TaggedPage typeName={thing.__typename} contentType={thing.contentType.node.graphqlSingleName} id={thing.id} key={thing.id} />
              ))
              }
              </div>
            </div>
          </div>
        </section>
        <CTA
          title="Questions or comments?"
          buttonText="Join the discussion on GitHub"
          buttonURL="https://github.com/wpengine/faustjs/discussions"
          headingLevel="h2">
          <p>
            We welcome feature requests, bug reports and questions in the{' '}
            <a href="https://github.com/wpengine/faustjs">
              Headless Framework GitHub repository
            </a>
            .
          </p>
        </CTA>
      </main>
	  </div>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
