import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, FormEvent, useRef } from 'react';

const UniversalHeader = () => {
  const [showNavSearch, setShowNavSearch] = useState(false);
  const [animateNavSearch, setAnimateNavSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navSearchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleShowNavSearch = () => {
    setShowNavSearch(true);
    setTimeout(() => {
      navSearchInputRef?.current?.focus();
      setAnimateNavSearch(true);
    }, 20);
  };

  const handleHideNavSearch = () => {
    setShowNavSearch(false);
    setTimeout(() => {
      setAnimateNavSearch(false);
    }, 20);
  };

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Encode HTML Entities
    const encodedQuery = searchQuery.replace(
      /[\u00A0-\u9999<>\&]/g,
      (i) => `&#${i.charCodeAt(0)};`
    );
    await router.push(`/search/${encodedQuery}`);
  };

  const linkItems = (
    <>
      <li>
        <Link href="/requestinfo">Request Info</Link>
      </li>
      <li>
        <Link href="/visit">Visit</Link>
      </li>
      <li>
        <Link href="/admissions">Apply</Link>
      </li>
      {/* Using <a> instead of <Link> for external link to prevent CORS issues with redirects */}
      <li>
        <a
          href="https://give.utk.edu/campaigns/42950/donations/new"
          //imodules link href="https://securelb.imodules.com/s/1341/utaa/form/19/form.aspx?sid=1341&gid=2&pgid=3204&cid=4841&src=giveto"
          // big orange give href="https://securelb.imodules.com/s/1341/utaa/form/19/form.aspx?sid=1341&gid=2&pgid=20602&cid=41138&appealcode=KD240001&src=webutk"
        >
          Give
        </a>
      </li>
    </>
  );

  return (
    <>
      <div id="universal-header" className="universal-header">
        <div className="universal-header__inner">
          <div className="universal-header__logo">
            <Link href="/">
              <img
                src="/images/chrome/logo-horizontal-left-smokey.svg"
                alt="University of Tennessee, Knoxville"
              />
            </Link>
          </div>
          <div className="universal-header__utility-nav">
            <div
              id="utility-nav-menu--large"
              className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper  utility-nav-menu--large"
            >
              <menu id="utility-nav-menu--large" className="utk-nav-menu">
                {linkItems}
              </menu>{' '}
              <div className="search-button-wrapper">
                <button
                  type="button"
                  id="search-slider-button"
                  className="search-button"
                  aria-label="Open search"
                  data-bs-toggle="collapse"
                  data-bs-target="#search-slider"
                  aria-expanded="false"
                  aria-controls="search-slider"
                  onClick={() => handleShowNavSearch()}
                >
                  <div
                    className="search-icon hide-when-closed"
                    role="presentation"
                  >
                    <svg
                      width="14"
                      height="13"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Search Icon</title>
                      <circle
                        cx="6.12"
                        cy="5.73"
                        r="4.22"
                        transform="matrix(0.99999, 0.00372, -0.00372, 0.99999, 0.02135, -0.02272)"
                        stroke-width="2"
                      ></circle>
                      <line
                        x1="9.35"
                        y1="8.41"
                        x2="12.71"
                        y2="11.8"
                        stroke-width="2"
                      ></line>
                    </svg>
                  </div>
                  <div className="hide-when-closed">Search</div>
                  <div className="close-icon-when-open" role="presentation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M13.0153 2.15711L10.8582 4.18425e-05L6.50716 4.35006L2.15711 0L0 2.15711L4.35001 6.50714L0 10.8572L2.15711 13.0143L6.50716 8.66421L10.8582 13.0142L13.0153 10.8572L8.66525 6.50714L13.0153 2.15711Z"
                        fill="#4B4B4B"
                      />
                    </svg>
                  </div>
                  <div className="hide-when-open visually-hidden sr-only">
                    Close
                  </div>
                </button>
                <div
                  id="search-slider"
                  className="search-slider collapse collapse-horizontal"
                >
                  <form
                    className="form-inline hidden-print mt-4"
                    id="cse-searchbox-form"
                    style={{ display: 'flex' }}
                    onSubmit={(e) => {
                      void handleSearchSubmit(e);
                    }}
                  >
                    <div className="mb-3 input-group">
                      <label
                        className="sr-only visually-hidden"
                        htmlFor="nav-search"
                        for="q"
                      >
                        Search
                      </label>
                      <input
                        type="search"
                        title="Search utk.edu"
                        placeholder="search utk.edu"
                        name="search"
                        id="site-search-field-slider"
                        className="form-control"
                        tabIndex="0"
                        ref={navSearchInputRef}
                        style={{
                          width: animateNavSearch ? '270px' : 0,
                          padding: animateNavSearch ? '0 0.5rem' : 0,
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="submit" className=" btn btn-utsearch">
                        <div className="button-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            id="searchHeader-open"
                          >
                            <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path>
                          </svg>
                          Search
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="universal-header__menu-open-button">
              <button
                className="menu-search-button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMainNav"
                aria-controls="mobileMainNav"
              >
                <div>
                  Menu
                  <span className="visually-hidden">and search</span>
                </div>
                <div className="search-icon" role="presentation">
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Search Icon</title>
                    <circle
                      cx="6.12"
                      cy="5.73"
                      r="4.22"
                      transform="matrix(0.99999, 0.00372, -0.00372, 0.99999, 0.02135, -0.02272)"
                      stroke-width="2"
                    ></circle>
                    <line
                      x1="9.35"
                      y1="8.41"
                      x2="12.71"
                      y2="11.8"
                      stroke-width="2"
                    ></line>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {/* Begin Search Overlay  */}
          <div
            className="nav-search-overlay"
            style={{
              display: showNavSearch ? 'flex' : 'none',
            }}
          >
            <div
              className="nav-search-inner"
              style={{ opacity: animateNavSearch ? 1 : 0 }}
            >
              <form
                className="form-inline hidden-print"
                id="cse-searchbox-form"
                style={{ display: 'flex' }}
                onSubmit={(e) => {
                  void handleSearchSubmit(e);
                }}
              >
                <div className="input-group flex-nowrap">
                  <label
                    className="sr-only visually-hidden"
                    htmlFor="nav-search"
                  >
                    Search
                  </label>
                  <input
                    type="search"
                    title="Search utk.edu"
                    placeholder="search utk.edu"
                    name="search"
                    id="nav-search"
                    ref={navSearchInputRef}
                    style={{
                      width: animateNavSearch ? '270px' : 0,
                      padding: animateNavSearch ? '0 0.5rem' : 0,
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn-utsearch btn-utsearch-tiny"
                  >
                    <div className="button-inner">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        id="searchHeader-open"
                      >
                        <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path>
                      </svg>
                      <span className="text-uppercase">Search</span>
                    </div>
                  </button>
                </div>
              </form>
              {/* Hide Search Overlay Button */}
              <button
                type="button"
                className="btn btn-close nav-search-close text-uppercase text-light navbar-toggler col-auto collapsed"
                aria-label="Close search"
                onClick={() => handleHideNavSearch()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  id="searchHeader-close"
                >
                  <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* End Search Overlay */}
        </div>
      </div>
    </>
  );
};

export default UniversalHeader;
