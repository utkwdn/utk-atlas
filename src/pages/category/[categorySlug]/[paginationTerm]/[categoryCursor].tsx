import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Page from 'pages/category/[categorySlug]';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  paginationTerm?: 'after' | 'before';
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export default Page;

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  if (!context.params)
    throw Error('There should be a `context.params` but none was found.');

  const { paginationTerm } = context.params;

  if (!(paginationTerm === 'after' || paginationTerm === 'before')) {
    return {
      notFound: true,
    };
  }

  return getNextStaticProps(context, {
    Page,
    client,
  });
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
