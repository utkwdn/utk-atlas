import Layout from '../components/Layout';
import AosPrograms from '../components/AosPrograms';
import AcademicsProgramSearch from '../components/AcademicsProgramSearch';
import { PageTitle } from 'components';
import Head from 'next/head';
// import AosPrograms from ''

function Social() {
  const aosName = 'Agriculture and Natural Resources';
  return (
    <Layout>
      <Head>
        <title>AOS Programs</title>
      </Head>
      <PageTitle title={aosName} />
      <div className="container-xxl" style={{ padding: '3rem 0' }}>
        <AcademicsProgramSearch />
      </div>
      <div className="container-xxl" style={{ padding: '3rem 0' }}>
        <AosPrograms aos={aosName} />
      </div>
    </Layout>
  );
}

export default Social;
