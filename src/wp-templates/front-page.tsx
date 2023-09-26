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

  const pageData = props.data?.pageBy;
  const generalSettings = props.data?.generalSettings;
  const yoastString = props.data?.pageBy?.seo?.fullHead || '';

  return (
    <>
      <Header />

      <Head>{parse(yoastString)}</Head>
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
  query GetFrontPage {
    pageBy(uri: "/") {
      content
      seo {
        fullHead
      }
    }
    generalSettings {
      title
    }
  }
`);

export default FrontPage;
