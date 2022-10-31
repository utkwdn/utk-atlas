import { getNextStaticProps } from '@faustjs/next';
import {
  client,
  OrderEnum,
  Post,
  PostObjectsConnectionOrderbyEnum,
} from 'client';
import { Footer, Header, Pagination, Posts } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styles from 'scss/pages/posts.module.scss';

const POSTS_PER_PAGE = 6;

export default function Page() {
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const isBefore = postSlug === 'before';
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  });

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Header />

      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>

      <main className="content content-index">
        {/* probably tweak `Posts` to avoid the `as` here */}
        <Posts
          posts={(posts?.nodes || []) as Post[]}
          heading="Blog Posts"
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
        {posts?.pageInfo && (
          <Pagination pageInfo={posts.pageInfo} basePath="/posts" />
        )}
      </main>

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
