import Layout from '../../components/Layout';
import { client } from 'client';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { getNextStaticProps } from '@faustjs/next';
import Head from 'next/head';
import Link from 'next/link';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import SiteSearch from '../../components/SiteSearch';
import { useState, useEffect } from 'react';
import styles from 'scss/pages/search.module.scss';
import { SSRProvider } from 'react-bootstrap';

function Search() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (router.query.slug) {
      setSearchQuery(router.query.slug as string);
    }
  }, [router.query.slug]);

  return (
    <SSRProvider>
      <Layout>
        <Head>
          <title>Search</title>
        </Head>

        <main className="content content-page">
          <div className={`container-xxl`}>
            <div className="row">
              <div className="col-12 col-xl-10 mb-5">
                <h1 className={'text-uppercase'} style={{ marginBottom: 0 }}>
                  Search
                </h1>
                <div className={styles['search-chunk']}>
                  <Tab.Container
                    id="left-tabs-example"
                    // className={'nav'}
                    defaultActiveKey="main"
                  >
                    <Nav
                      variant="pills"
                      className="nav nav-pills nav-tabs justify-content-start search-tab-navigation"
                      defaultActiveKey="main"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="main">utk.edu</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="events">Events</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="news">News</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="directory">Directory</Nav.Link>
                      </Nav.Item>
                      <div className={styles['search-external-links']}>
                        <Link href="/alpha" className={styles['search-link']}>
                          A-Z Index
                        </Link>
                        <a
                          href="https://maps.utk.edu"
                          className={styles['search-link']}
                        >
                          Maps
                        </a>
                      </div>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="main" className="search-tab-pane">
                        <SiteSearch searchTerm={searchQuery} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="events" className="search-tab-pane">
                        <div>
                          <p className="d-block d-sm-none ">Search events</p>
                          <form
                            className="form-inline hidden-print mt-4"
                            id="events-searchbox-form"
                            action="https://calendar.utk.edu/search"
                          >
                            <div className="mb-3 input-group">
                              <label
                                className="sr-only visually-hidden"
                                htmlFor="q-events"
                              >
                                Search
                              </label>
                              <input
                                type="search"
                                className="form-control left-border"
                                title="Search events"
                                placeholder="Example: Orientation, Art Show, Yoga Session"
                                name="search"
                                id="q-events"
                              />
                              <button
                                type="submit"
                                className="btn btn-utsearch"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  id="searchHeader-open"
                                >
                                  <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path>
                                </svg>{' '}
                                <span className="text-uppercase">Search</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="news" className="search-tab-pane">
                        <div>
                          <p className="d-block d-sm-none ">Search news</p>
                          <form
                            className="form-inline hidden-print mt-4"
                            id="news-searchbox-form"
                            action="https://news.utk.edu/"
                          >
                            <div className="mb-3 input-group">
                              <label
                                className="sr-only visually-hidden"
                                htmlFor="q-news"
                              >
                                Search
                              </label>
                              <input
                                type="search"
                                className="form-control left-border"
                                title="Search news"
                                placeholder="Example: Dean's List, ORNL, Capstone Project"
                                name="s"
                                id="q-news"
                              />
                              <button
                                type="submit"
                                className="btn btn-utsearch"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  id="searchHeader-open"
                                >
                                  <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path>
                                </svg>{' '}
                                <span className="text-uppercase">Search</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane
                        eventKey="directory"
                        className="search-tab-pane"
                      >
                        <div>
                          <p className="d-block d-sm-none ">Search directory</p>
                          <form
                            className="form-inline hidden-print mt-4"
                            id="dir-searchbox-form"
                            action="https://directory.utk.edu/search"
                          >
                            <div className="mb-3 input-group">
                              <label
                                className="sr-only visually-hidden"
                                htmlFor="query"
                              >
                                Search
                              </label>
                              <input
                                type="search"
                                className="form-control left-border"
                                title="Search directory"
                                placeholder="Example: Jane Doe, NetID, email@utk.edu"
                                name="query"
                                id="search-bar"
                              />
                              <button
                                type="submit"
                                className="btn btn-utsearch"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  id="searchHeader-open"
                                >
                                  <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path>
                                </svg>{' '}
                                <span className="text-uppercase">Search</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </SSRProvider>
  );
}

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: Search,
    client,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
