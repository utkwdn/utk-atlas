import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';
import ParsedMarkup from 'components/ParsedMarkup';
import SlateModal from 'components/SlateModal';
import parse from 'html-react-parser';
import { useState, useEffect, useRef } from 'react';

export interface PageProps {
  page: PageType | null | undefined;
}

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

export function PageComponent({ page }: PageProps) {
  const [dynamicSrc, setDynamicSrc] = useState<string>('');
  const [slateFormInfo, setSlateFormInfo] = useState<FormInfoObject[]>([]);
  const [clickedModalId, setClickedModalId] = useState<string>('');
  const [trigger, setTrigger] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const pageSlug = page?.slug;
  const yoastHead = parse(page?.seo?.fullHead || '');
  const showPageTitle = page?.showsHeadline || false;

  const handleSlateButtonClick = (modalId: string) => {
    setTrigger((trigger) => trigger + 1);
    setClickedModalId(modalId);
  };

  useEffect(() => {
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
            <ParsedMarkup
              content={page?.content() || ''}
              elevateFormInfo={setSlateFormInfo}
              elevateSlateButtonClick={handleSlateButtonClick}
              dynamicSrc={dynamicSrc || ''}
            />
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings?.title || undefined} />

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
