// import { gql } from '@apollo/client';
import { gql } from '../__generated__';
import {
  GetCategoryPageQuery,
  GetCategoryPageQueryVariables,
} from '../__generated__/graphql';
import { getNextStaticProps, FaustTemplate } from '@faustwp/core';
import { Footer, Header, Posts, Pagination } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

interface PropsObject {
  data: {
    nodeByUri: {
      name: string;
      slug: string;
      posts: {
        nodes: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          featuredImage: {
            node: {
              sourceUrl: string;
              title: string;
            };
          };
        }[];
        pageInfo: {
          endCursor: string;
          startCursor: string;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      };
    };
    generalSettings: {
      title: string;
    };
  };
}

// const Component: FaustTemplate<GetCategoryPageQuery> = (props) => {
export default function Component(props: PropsObject) {
  const nodeData = props.data?.nodeByUri;
  const generalSettings = props.data.generalSettings;
  console.log(generalSettings);

  return (
    <>
      <Header />

      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>

      <main className="content content-single">
        <div className="wrap">
          <h2>Category: {nodeData?.name}</h2>

          <Posts posts={nodeData?.posts?.nodes} />

          {nodeData?.posts?.pageInfo && (
            <Pagination
              pageInfo={nodeData.posts.pageInfo}
              basePath={`/category/${
                typeof nodeData.slug === 'string' ? nodeData.slug : ''
              }`}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

Component.query = gql(`
  query GetCategoryPage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
        slug
        posts {
          nodes {
            id
            title
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                title
                sourceUrl
              }
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
    generalSettings {
      title
    }
  }
`);

Component.variables = ({ uri }: GetCategoryPageQueryVariables) => {
  return {
    uri,
  };
};
