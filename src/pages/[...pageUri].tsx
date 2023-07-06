import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';
import ParsedMarkup from 'components/ParsedMarkup';
import parse from 'html-react-parser';
import { useState, useEffect, useRef } from 'react';

export interface PageProps {
  page: PageType | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const [dynamicSrc, setDynamicSrc] = useState<string>('');
  const [slateFormInfo, setSlateFormInfo] = useState<object | boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const pageSlug = page?.slug;
  const yoastHead = parse(page?.seo?.fullHead || '');
  const showPageTitle = page?.showsHeadline || false;
  console.log(
    'My custom identifier class is based on slug: ' + (pageSlug || '')
  );

  const handleSlateButtonClick = (modalId: string) => {
    alert(`Page component - slate clicked. ID=${modalId}`);
  };

  // Slate Form Info Format
  // {
  //   "formId1&formId2": {
  //     "modalTitle": "cap button text",
  //     "formInfo": [{
  //       "tabTitle": "title",
  //       "formId": "xxx-xxx",
  //       "scriptSrc": "https://xxxxx"
  //     }, {
  //       "tabTitle": "title",
  //       "formId": "xxx-xxx",
  //       "scriptSrc": "https://xxxxx"
  //     }]
  //   },
  //   "formId3": {
  //     "modalTitle": "cap button text",
  //     "formInfo": [{
  //       "tabTitle": "title",
  //       "formId": "xxx-xxx",
  //       "scriptSrc": "https://xxxxx"
  //     }]
  //   }
  // }

  useEffect(() => {
    // Check if url param 'src' is set and save to dynamicSrc if so
    const searchParams = new URLSearchParams(document.location.search);
    const srcParam = searchParams.get('src');
    if (srcParam) {
      setDynamicSrc(srcParam);
    }
  }, []);

  return (
    <>
      <Header />

      <Head>{yoastHead}</Head>

      {showPageTitle ? (
        <PageTitle
          title={page?.title() || ''}
          bgImage={page?.featuredImage?.node?.sourceUrl() || undefined}
        />
      ) : (
        ''
      )}

      <main className={'content content-single ' + (pageSlug || '')}>
        <div className="container-xxl pt-5">
          <div>
            <div>{dynamicSrc}</div>
            <ParsedMarkup
              content={page?.content() || ''}
              elevateFormInfo={setSlateFormInfo}
              elevateSlateButtonClick={handleSlateButtonClick}
            />
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings?.title || undefined} />
      {typeof slateFormInfo === 'object' ? (
        <div ref={modalRef}>{JSON.stringify(slateFormInfo)}</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    // Refresh WP content after 2 min. Default is 900 seconds (15 min.)
    revalidate: 120,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
