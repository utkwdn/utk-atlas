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
import { useState, useEffect, FormEvent } from 'react';
import { Button } from 'react-bootstrap';
import styles from 'scss/pages/search.module.scss';

function Search() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('allUtk');
  const [formAction, setFormAction] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('');

  const handleTypeChoice = (typeChoice: string) => {
    setSearchType(typeChoice);
    switch (typeChoice) {
      case 'directory':
        setFormAction(`https://directory.utk.edu/search?query=`);
        setPlaceholder('Example: Jane Doe, NetID, email@utk.edu');
        break;
      case 'news':
        setFormAction(`https://news.utk.edu/?s=`);
        setPlaceholder("Example: Dean's List, ORNL, Capstone Project");
        break;
      case 'events':
        setFormAction(`https://calendar.utk.edu/search/events?search=`);
        setPlaceholder('Example: Orientation, Art Show, Yoga Session');
      // code block
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${formAction}${searchQuery}`);
  };

  useEffect(() => {
    if (router.query.slug) {
      setSearchQuery(router.query.slug as string);
    }
  }, [router.query.slug]);

  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>

      <main className="content content-page">
        <div className={`container-xxl`}>
          <div className="row">
            <div className="col-12 col-xl-8">
              <h1 className={'text-uppercase'} style={{ marginBottom: 0 }}>
                Search
              </h1>
              <div className={styles['search-chunk']}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="main">
                  <Nav
                    variant="pills"
                    className="nav nav-pills nav-tabs justify-content-center justify-content-lg-start search-tab-navigation"
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
                      <SiteSearch />
                    </Tab.Pane>
                    <Tab.Pane eventKey="events" className="search-tab-pane">
                      <div>
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
                              className="form-control"
                              title="Search events"
                              placeholder="Example: Orientation, Art Show, Yoga Session"
                              name="search"
                              id="q-events"
                            />
                            <button type="submit" className="btn btn-utlink">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="white"
                                className="bi bi-search"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                              </svg>{' '}
                              <span className="text-white">Search</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="news" className="search-tab-pane">
                      <div>
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
                              className="form-control"
                              title="Search news"
                              placeholder="Example: Dean's List, ORNL, Capstone Project"
                              name="s"
                              id="q-news"
                            />
                            <button type="submit" className="btn btn-utlink">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="white"
                                className="bi bi-search"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                              </svg>{' '}
                              <span className="text-white">Search</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="directory" className="search-tab-pane">
                      <div>
                        {/* Start Search Functionality  */}
                        {searchType === 'allUtk' ? (
                          <SiteSearch searchTerm={searchQuery} />
                        ) : (
                          <form
                            className="form-inline hidden-print mt-4"
                            id={`${searchType}-searchbox-form`}
                            onSubmit={(e) => {
                              handleSearchSubmit(e);
                            }}
                          >
                            <div className="mb-3 input-group">
                              <label
                                className="sr-only visually-hidden"
                                htmlFor={`q-${searchType}`}
                              >
                                Search
                              </label>
                              <input
                                type="search"
                                className="form-control"
                                title={`Search ${searchType}`}
                                placeholder={placeholder}
                                name="search"
                                id={`q-${searchType}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <button type="submit" className="btn btn-utlink">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="white"
                                  className="bi bi-search"
                                  aria-hidden="true"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>{' '}
                                <span className="text-white">Search</span>
                              </button>
                            </div>
                          </form>
                        )}
                        {/* End Search Functionality */}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>

                {/* Original Form pulled form utk.edu
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
                                className="form-control"
                                title="Search directory"
                                placeholder="Example: Jane Doe, NetID, email@utk.edu"
                                name="query"
                                id="search-bar"
                              />
                              <button type="submit" className="btn btn-utlink">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="white"
                                  className="bi bi-search"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>{' '}
                                <span className="text-white">Search</span>
                              </button>
                            </div>
                          </form>
                       */}

                {/* Mark's Buttons –– keeping for a min to make sure we don't need anything here.....
                <div className={styles['search-buttons']}>
                  <Button
                    className={`${styles['search-button']} ${
                      searchType == 'allUtk' ? styles['selected'] : 'nope'
                    }`}
                    onClick={() => handleTypeChoice('allUtk')}
                  >
                    utk.edu
                  </Button>
                  <Button
                    className={`${styles['search-button']} ${
                      searchType == 'directory' ? styles['selected'] : 'nope'
                    }`}
                    onClick={() => handleTypeChoice('directory')}
                  >
                    directory
                  </Button>
                  <Button
                    className={`${styles['search-button']} ${
                      searchType == 'news' ? styles['selected'] : 'nope'
                    }`}
                    onClick={() => handleTypeChoice('news')}
                  >
                    news
                  </Button>
                  <Button
                    className={`${styles['search-button']} ${
                      searchType == 'events' ? styles['selected'] : 'nope'
                    }`}
                    onClick={() => handleTypeChoice('events')}
                  >
                    events
                  </Button>
                  </div>*/}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
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