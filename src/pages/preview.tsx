import { PageComponent } from 'pages/[...pageUri]';
import { PostComponent } from 'pages/posts/[postSlug]';
import type { Page, Post } from 'client';
import { client } from 'client';

export default function Preview() {
  const { typeName, node } = client.auth.usePreviewNode();

  if (client.useIsLoading() || node === undefined) {
    return <p>loading...</p>;
  }

  if (node === null) {
    return <p>Post not found</p>;
  }

  switch (typeName) {
    case 'Page': {
      return <PageComponent page={node as Page} />
    }
    case 'Post': {
      return <PostComponent post={node as Post} />
    }
    // Add custom post types here as needed
    default: {
      throw new Error(`Unknown post type: ${typeName}`);
    }
  }
}
