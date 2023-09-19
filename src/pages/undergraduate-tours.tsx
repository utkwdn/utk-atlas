import Layout from '../components/Layout';
import { PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import Head from 'next/head';
import SlateFormEmbed from '../components/SlateFormEmbed';
import { useEffect, useState } from 'react';

const UNDERGRAD_ID = 'e20f8349-6ef3-4b8c-b48d-f25ef6174c8d';

function GraduateToursForm() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <Layout>
      <Head>
        <title>Undergraduate Tours</title>
      </Head>
      <PageTitle title={'Undergraduate Tours'} />
      <div className="container-xxl" style={{ padding: '3rem 0' }}>
        <SlateFormEmbed
          id={UNDERGRAD_ID}
          scriptSrc={
            `https://govols.utk.edu/register/?id=${UNDERGRAD_ID}&output=embed&div=form_${UNDERGRAD_ID}` +
            (location.search.length > 1
              ? '&' + location.search.substring(1)
              : '')
          }
        />
      </div>
    </Layout>
  ) : (
    <></>
  );
}

export default GraduateToursForm;

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return getNextStaticProps(context, {
//     Page: GraduateToursForm,
//     client,
//   });
// }
