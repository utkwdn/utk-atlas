import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { GetStaticProps } from 'next';

export type WordPressTemplateProps = Parameters<typeof WordPressTemplate>[0];

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = (ctx) => {
  return getWordPressProps({ ctx });
};
