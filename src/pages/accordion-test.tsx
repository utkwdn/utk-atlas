import Layout from '../components/Layout';
import { PageTitle } from 'components';
import Head from 'next/head';
import AccordionComponent from '../components/AccordionComponent';
import { useEffect, useState } from 'react';

function AccordionTest() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <Layout>
      <Head>
        <title>Accordion Test</title>
      </Head>
      <PageTitle title={'Accordion Test'} />
      <AccordionComponent content="Test Content" />
    </Layout>
  ) : (
    <></>
  );
}

export default AccordionTest;
