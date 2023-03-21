import Layout from '../components/Layout';
import { PageTitle } from 'components';
import { client } from 'client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

import styles from 'scss/components/Carousel.module.scss';
import YoutubeCarousel from 'components/YoutubeCarousel';
import VisitModalButton from 'components/VisitModalButton';

import Head from 'next/head';

function VisitTest() {
  return (
    <Layout>
      <Head>
        <title>Visit Test</title>
      </Head>
      <PageTitle title={'Visit Test'} />
      <div className="" style={{ padding: '3rem 0' }}>
        <div className="container-xxl">
          <p>This is the test visit page content.</p>

          {/* Start Modal Button Section */}
          <VisitModalButton />
          {/* End Modal Button Section */}
        </div>

        <div
          className="wp-block-spacer"
          aria-hidden="true"
          style={{ height: '10vw' }}
        ></div>

        <div className={styles['carouselSection']}>
          <div
            style={{ padding: '10vw 2vw 0' }}
            className={styles['leftForty']}
          >
            <div className="is-layout-flow wp-block-group title-container">
              <p className="theme">Campus Highlights</p>
              <p>
                Resources are abundant on campus. Students have access to a
                health center with five offices, a recreation center that
                organizes intramurals and adventure trips, and have over 40
                dining options.
              </p>
              <p className="fancyLink">
                <a href="#">Explore Virtually</a>
              </p>
            </div>
          </div>
          <div className={styles['rightSixty']}>
            {/* Start Video Carousel Section */}
            <YoutubeCarousel cardWidth={828} cardMargin={20} />

            {/* End Video Carousel Section */}
          </div>
        </div>

        <div
          className="wp-block-spacer"
          aria-hidden="true"
          style={{ height: '10vw' }}
        ></div>
      </div>
    </Layout>
  );
}

export default VisitTest;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: VisitTest,
    client,
  });
}
