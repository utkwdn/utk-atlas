import { gql } from '../__generated__';
import { GetFrontPageQuery } from '../__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import Head from 'next/head';
import React from 'react';
import { useState, useEffect } from 'react';
import { Footer, Header } from 'components';
import parse from 'html-react-parser';
import Hero from 'components/Hero.js';
import ParsedMarkup from 'components/ParsedMarkup';

const FrontPage: FaustTemplate<GetFrontPageQuery> = (props) => {
  const [dynamicSrc, setDynamicSrc] = useState<string>('');

  useEffect(() => {
    // Check if url param 'dmc' is set and save to dynamicSrc if so
    const searchParams = new URLSearchParams(document.location.search);
    const srcParam = searchParams.get('dmc');
    if (srcParam) {
      setDynamicSrc(srcParam);
    }
  }, []);

  const pageData = props.data?.page;
  // const generalSettings = props.data?.generalSettings;
  // const siteTitle = props.data?.generalSettings?.title || undefined;
  const yoastString = props.data?.page?.seo?.fullHead || '';
  const seoTitle =
    props.data?.page?.seo?.title || 'University of Tennessee, Knoxville';

  return (
    <>
      <Header />

      <Head>
        <title>{seoTitle}</title>
        {parse(yoastString)}
      </Head>
      <Hero />

      <div className="container-fluid">
        <main id="content">
          <div className="entry-content container-xxl">
            <ParsedMarkup
              content={pageData?.content || ''}
              dynamicSrc={dynamicSrc || ''}
            />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

FrontPage.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

FrontPage.query = gql(`
  query GetFrontPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      content
      seo {
        title
        fullHead
      }
    }
    generalSettings {
      title
    }
  }
`);

export default FrontPage;
