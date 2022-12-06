import React from 'react';
import { client } from 'client';
import { Header, PageTitle, Footer } from '../components';
import SearchModalBody from '../components/SearchModalBody';
import { SSRProvider } from 'react-bootstrap';
import styles from 'scss/pages/404.module.scss';

export default function Page(): JSX.Element {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <SSRProvider>
      <Header />
      <main className="content content-page">
        {/* <PageTitle title={'Page Not Found'} /> */}
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
                We're sorry. It looks like nothing was found at this location.
                Try re-entering the address or search our site using the options
                below.
              </p>
            </div>
          </div>
          <div className={styles['search-container']}>
            <SearchModalBody displayTitle={false} />
          </div>
        </div>
      </main>
      <Footer copyrightHolder={generalSettings?.title || undefined} />
    </SSRProvider>
  );
}
