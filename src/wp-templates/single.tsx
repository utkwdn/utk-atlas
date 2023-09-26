import { gql } from '../__generated__';
import { GetPostQuery } from '../__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Footer, Header, PageTitle } from 'components';
import ParsedMarkup from 'components/ParsedMarkup';
import Head from 'next/head';

const Post: FaustTemplate<GetPostQuery> = (props) => {
  const postData = props.data?.post;
  const generalSettings = props.data?.generalSettings;

  return (
    <>
      <Header />

      <Head>
        <title>
          {postData?.title} - {generalSettings?.title}
        </title>
      </Head>

      <PageTitle
        title={postData?.title || ''}
        bgImage={postData?.featuredImage?.node?.sourceUrl || undefined}
      />

      <main className="content content-single">
        <div className="container-xxl py-5">
          <div>
            <ParsedMarkup content={postData?.content || ''} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

Post.query = gql(`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      content
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    generalSettings {
      title
    }
  }
`);

Post.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

export default Post;
