import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';
import ParsedMarkup from 'components/ParsedMarkup';
import parse from 'html-react-parser';

export interface PageProps {
  page: PageType | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const pageSlug = page?.slug;
  const yoastHead = parse(page?.seo?.fullHead || '');
  // console.log(yoastHead);
  console.log(
    'My custom identifier class is based on slug: ' + (pageSlug || '')
  );

  return (
    <>
      <Header />

      <Head>{yoastHead}</Head>

      <PageTitle
        title={page?.title() || ''}
        bgImage={page?.featuredImage?.node?.sourceUrl() || undefined}
      />
      <main className={'content content-single ' + (pageSlug || '')}>
        <div className="container-xxl pt-5">
          <div>
            <ParsedMarkup content={page?.content() || ''} />
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings?.title || undefined} />
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
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
