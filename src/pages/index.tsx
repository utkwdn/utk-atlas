import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, Hero, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client } from 'client';
import { getArrayFields, castNotSkeleton } from 'gqty';


export default function Page() {
  const { useQuery, usePage } = client;
  const generalSettings = useQuery().generalSettings;
  
  const allPages = getArrayFields(useQuery().pages().nodes, 'isFrontPage', 'id');
  //const frontPage = allPages.find(x => x.isFrontPage === true);
  
  console.log(allPages.map(({ 'isFrontPage', 'id' })));

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
			      <header className="entry-header col-12"><h1 className="entry-title">Home</h1></header>
					</div>
				</div>
			</div>
			<div className="entry-content container-xxl">

				<p>Sint in cum totam. Officiis nihil aut voluptatem maiores. Aperiam repellendus provident sint aut. Culpa illo beatae earum alias. Quae deleniti at omnis dicta nobis et sint. Provident sint et fugiat sequi quis et.</p>

				<p> Molestiae dolores natus ut. Corporis consequatur assumenda nobis dicta mollitia repellendus consequuntur eligendi. Animi ducimus ea et consequatur ut. Delectus dolor quis similique maxime officiis tempore consequatur. Ea et est tenetur voluptas. Quia sunt dolores ipsam quasi et.</p>

				<p> Dolorem sapiente repellat quo. Totam veritatis magni qui facere labore quidem non. Non iure dolores quia voluptatum ducimus animi. Dolores quaerat maiores totam beatae consequuntur qui aperiam.</p>

				<p> Qui autem dolore ipsam hic ut velit id. At atque quod est et iure rerum minima sunt. Sunt consequatur eum consequatur. Consectetur eligendi facilis aliquam ad cum. Provident et culpa itaque perferendis dolores. Sapiente neque omnis ab esse dolore vel voluptatum dignissimos.</p>

				<p> Repellat iure omnis et officiis. Numquam aut dicta eum. Aliquam labore dolores velit enim placeat. Minima ut delectus cumque tempore architecto ab ab quisquam. Ducimus quod inventore eum est recusandae.</p>

      		</div>
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
                <h3>Global Styles and Fonts</h3>
                <p>
                  Add styles to load on every page, such as typography and
                  layout rules, in <code>src/scss/main.scss</code>. The project
                  adds{' '}
                  <a href="https://necolas.github.io/normalize.css/">
                    normalize.css
                  </a>{' '}
                  in <code>src/pages/_app.tsx</code>. Google Fonts are enqueued
                  in <code>src/pages/_document.tsx</code>.
                </p>
              </div>

              <div className={styles.feature}>
                <h3>Components</h3>
                <p>
                  Add or edit components in the <code>src/components</code>{' '}
                  folder. Find component styles at{' '}
                  <code>src/scss/components</code>, which use{' '}
                  <a href="https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css">
                    CSS modules
                  </a>{' '}
                  to scope CSS to each component.
                </p>
              </div>

              <div className={styles.feature}>
                <h3>Hooks</h3>
                <p>
                  Fetch data from WordPress with <code>usePost</code>,{' '}
                  <code>usePosts</code>, <code>useGeneralSettings</code> and
                  other custom hooks. Use these hooks in your page templates to
                  pass data to custom components. See{' '}
                  <code>src/pages/index.tsx</code> for examples.
                </p>
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
