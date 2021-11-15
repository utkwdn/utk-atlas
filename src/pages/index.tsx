import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, Hero, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client, PageIdType } from 'client';
//import { getArrayFields, castNotSkeleton } from 'gqty';
import TimelineEvent from '../components/TimelineEvent';


export default function Page() {
  const { useQuery, usePage, usePosts } = client;
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

  const posts = usePosts({
    first: 6,
    where: {
      categoryName: 'uncategorized',
    },
  });
  //console.log(timelineEvents[0].slug);

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
      <div className="container-xxl">
          <h2 className="display-3">Timeline Events <small className="text-muted">(some custom post types)</small></h2>

          <hr className="orange-hash" />
          <div className="row">
            {timelineEvents.map((timelineEvent) => (
              <TimelineEvent key={timelineEvent?.id} timelineEvent={timelineEvent} />
            ))
            }
        </div>
      </div>
    </section>


    <Posts
      posts={posts.nodes}
      heading="Latest Posts"
      intro="The Posts component in src/pages/index.tsx shows the latest six posts from the connected WordPress site."
      headingLevel="h2"
      postTitleLevel="h3"
      id={styles.post_list}
    />

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
