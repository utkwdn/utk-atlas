import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { GetStaticPaths, GetStaticProps } from 'next';

export type WordPressTemplateProps = Parameters<typeof WordPressTemplate>[0];

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

const isDevelopment = process.env.NODE_ENV === 'development';

export const getStaticProps: GetStaticProps = (ctx) => {
  return getWordPressProps({ ctx, revalidate: 120 });
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
