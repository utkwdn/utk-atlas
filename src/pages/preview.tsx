import { WordPressTemplate } from '@faustwp/core';

export type WordPressTemplateProps = Parameters<typeof WordPressTemplate>[0];

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}
