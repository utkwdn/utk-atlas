import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { Footer, Header, PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

export interface PostProps {
  post: Post | null | undefined;
}

export function PostComponent({ post }: PostProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Header />

      <Head>
        <title>
          {post?.title()} - {generalSettings?.title}
        </title>
      </Head>

      <PageTitle
        title={post?.title() || ''}
        bgImage={post?.featuredImage?.node?.sourceUrl() || undefined}
      />

      <main className="content content-single">
        <div className="container-xxl py-5">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings?.title || undefined} />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
