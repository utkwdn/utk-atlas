import { gql } from '../__generated__';
import { GetPageQuery } from '../__generated__/graphql';
import { FaustTemplate } from '@faustwp/core';
import { Footer, Header, PageTitle } from 'components';
import Head from 'next/head';
import ParsedMarkup from 'components/ParsedMarkup';
import SlateModal from 'components/SlateModal';
import { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';

interface FormInfoInnerObject {
  tabTitle: string;
  formId: string;
  scriptSrc: string;
}

interface FormInfoObject {
  modalId: string;
  modalTitle: string;
  formInfo: FormInfoInnerObject[];
}

const Page: FaustTemplate<GetPageQuery> = (props) => {
  const [dynamicSrc, setDynamicSrc] = useState<string>('');
  const [slateFormInfo, setSlateFormInfo] = useState<FormInfoObject[]>([]);
  const [clickedModalId, setClickedModalId] = useState<string>('');
  const [trigger, setTrigger] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const pageData = props.data?.page;

  const pageSlug = pageData?.slug;
  const yoastString = pageData?.seo?.fullHead || '';
  // const showPageTitle = pageData?.showsHeadline;
  const templateName = pageData?.template?.templateName || '';
  const pageTitle = pageData?.title || '';
  const pageContent = pageData?.content || '';
  const bgImageUrl = pageData?.featuredImage?.node.sourceUrl || undefined;
  // const siteTitle = props.data?.generalSettings?.title || undefined;

  const handleSlateButtonClick = (modalId: string) => {
    setTrigger((trigger) => trigger + 1);
    setClickedModalId(modalId);
  };

  useEffect(() => {
    // console.log('non-working version');
    // Check if url param 'dmc' is set and save to dynamicSrc if so
    const searchParams = new URLSearchParams(document.location.search);
    const srcParam = searchParams.get('dmc');
    if (srcParam) {
      setDynamicSrc(srcParam);
    }
  }, []);

  return (
    <>
      <Header />

      <Head>{parse(yoastString)}</Head>

      {templateName !== 'No-title' ? (
        <PageTitle title={pageTitle} bgImage={bgImageUrl} />
      ) : (
        ''
      )} */}

      <main className={'content content-single ' + (pageSlug || '')}>
        <div className="container-xxl pt-5">
          <div>
            <ParsedMarkup
              content={pageContent}
              elevateFormInfo={setSlateFormInfo}
              elevateSlateButtonClick={handleSlateButtonClick}
              dynamicSrc={dynamicSrc || ''}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Slate Form Modal */}
      {slateFormInfo.length > 0 ? (
        <div ref={modalRef}>
          {slateFormInfo?.map((thisForm, i) => {
            return (
              <SlateModal
                key={i}
                formInfo={thisForm}
                clickedModalId={clickedModalId}
                trigger={trigger}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      slug
      template {
        templateName
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
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

export default Page;
