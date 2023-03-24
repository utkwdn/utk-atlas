import Layout from '../components/Layout';
import { PageTitle } from 'components';
import { client } from 'client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import Head from 'next/head';
import SlateFormEmbed from '../components/SlateFormEmbed';
import { useEffect, useState } from 'react';

const GRAD_ID = '5880822a-64f0-4764-bca2-5f401da0fb37';

function GraduateToursForm() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <Layout>
      <Head>
        <title>Graduate Tours Form</title>
      </Head>
      <PageTitle title={'Graduate Tours Form'} />
      <div className="container-xxl" style={{ padding: '3rem 0' }}>
        <SlateFormEmbed
          id={GRAD_ID}
          scriptSrc={
            `https://apply.gradschool.utk.edu/register/?id=${GRAD_ID}&output=embed&div=form_${GRAD_ID}` +
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

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: GraduateToursForm,
    client,
  });
}
