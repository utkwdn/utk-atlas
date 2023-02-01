import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import SearchBody from '../components/404SearchBody';
import { SSRProvider } from 'react-bootstrap';
import styles from 'scss/pages/404.module.scss';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';

const NotFound = () => {
  return (
    <SSRProvider>
      <Layout>
        <Head>
          <title>404 | Page Not Found</title>
        </Head>
        <main className="content content-page">
          <div
            className={`container-xxl justify-content-center ${styles['four-oh-four-content']}`}
          >
            <div className="row justify-content-center">
              <div className="col-12 col-xl-8">
                <h1>
                  404 <span className={styles['heading-seperator']}></span> Page
                  Not Found
                </h1>
                <p>
                  We&apos;re sorry. It looks like nothing was found at this
                  location. Try re-entering the address or search our site using
                  the options below.
                </p>
              </div>
            </div>
            <div className={styles['search-container']}>
              <SearchBody />
            </div>
          </div>
        </main>
      </Layout>
    </SSRProvider>
  );
};

export default NotFound;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: NotFound,
    client,
  });
}
