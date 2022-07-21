import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';

interface Props {
  title?: string;
  description?: string;
  uri?: string;
}

function Header({
  title = 'Headless by WP Engine',
  description,
  uri,
}: Props): JSX.Element {
  const uriParts = (uri || '').split('/').filter(Boolean);
  const firstUriPartRaw = uriParts[0];
  const secondUriPartRaw = uriParts[1];
  const firstUriPart = uriParts[0] ? `/${firstUriPartRaw}` : null;
  const secondUriPart = uriParts[1] ? `/${secondUriPartRaw}` : null;
  const firstTwoUriParts =
    firstUriPart && secondUriPart ? `${firstUriPart}${secondUriPart}` : null;

  const { menuItems } = client.useQuery();
  const links =
    menuItems({
      where: { location: MenuLocationEnum.PRIMARY },
    })?.nodes || [];

  const currentTopLevelItem = firstUriPart
    ? links.find((link) => link?.uri === `${firstUriPart}/`)
    : null;
  const currentTopLevelItemId = currentTopLevelItem?.id;
  const currentSecondLevelItemId = firstTwoUriParts
    ? links.find((link) => link?.uri === `${firstTwoUriParts}/`)?.id
    : null;

  /** Primary nav items (desktop and mobile) */
  const primaryNavItems = links.flatMap((link) => {
    // if it has `parentId`, it's not a top-level item, so skip it
    const parentId = link?.parentId;
    if (parentId) return [];

    const id = link?.id;
    const url = link?.url;
    /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
    const itemUri = link?.uri;
    const label = link?.label;
    const children = link?.childItems()?.nodes || [];

    if (!id || !url || !itemUri || !label) return [];

    const hasChildren = children.length > 0;

    /** sub-nav, if applicable (only appears in mobile menu) */
    const subNav = hasChildren ? (
      <ul className="sub-menu">
        {children.flatMap((child) => {
          const childLabel = child?.label;
          const childUrl = child?.url;
          /** Will be same as `childUrl` if external link, but root-relative path (with trailing slash) if internal link. */
          const childUri = child?.uri;
          const childId = child?.id;

          if (!childLabel || !childUrl || !childUri || !childId) return [];

          const childIsInternal = childUrl !== childUri;
          const childIsCurrent = childId === currentSecondLevelItemId;

          return (
            <li
              key={childId}
              className={childIsCurrent ? 'current-menu-item' : ''}
            >
              {childIsInternal ? (
                <Link href={childUri}>
                  <a {...(childIsCurrent ? { 'aria-current': 'true' } : {})}>
                    {childLabel}
                  </a>
                </Link>
              ) : (
                <a href={childUri}>{childLabel}</a>
              )}
            </li>
          );
        })}
      </ul>
    ) : (
      <></>
    );

    const isInternal = url !== itemUri;

    const isCurrent = id === currentTopLevelItemId;
    const currentClasses = isCurrent
      ? 'current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor'
      : '';

    const hasChildrenClasses = hasChildren ? 'menu-item-has-children' : '';

    return (
      <li key={id} className={`${currentClasses} ${hasChildrenClasses}`.trim()}>
        {isInternal ? (
          <Link href={itemUri}>
            <a
              className="main-navigation"
              {...(isCurrent ? { 'aria-current': 'true' } : {})}
            >
              {label}
            </a>
          </Link>
        ) : (
          <a href={itemUri} className="main-navigation">
            {label}
          </a>
        )}

        {subNav}
      </li>
    );
  });

  /** Desktop section-nav (if there is one) */
  const secondaryNavItems = (
    currentTopLevelItem?.childItems()?.nodes || []
  ).flatMap((link) => {
    const url = link?.url;
    /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
    const itemUri = link?.uri;
    const label = link?.label;
    const id = link?.id;

    if (!url || !itemUri || !label || !id) return [];

    const isInternal = itemUri !== url;
    const isCurrent = id === currentSecondLevelItemId;

    return (
      <li key={id} className={isCurrent ? 'current-menu-item' : ''}>
        {isInternal ? (
          <Link href={itemUri}>
            <a {...(isCurrent ? { 'aria-current': 'true' } : {})}>{label}</a>
          </Link>
        ) : (
          <a href={itemUri}>{label}</a>
        )}
      </li>
    );
  });

  return (
    <>
      <nav id="universal-header">
        <div className="container-xxl">
          <ul className="row justify-content-end list-inline mb-0">
            <li className="col-auto">
              <small>
                <a
                  href="https://www.utk.edu/requestinfo/"
                  className="nav-link px-0 text-light text-uppercase"
                >
                  Request Info
                </a>
              </small>
            </li>
            <li className="col-auto">
              <small>
                <a
                  href="https://www.utk.edu/visit/"
                  className="nav-link px-0 text-light text-uppercase"
                >
                  Visit
                </a>
              </small>
            </li>
            <li className="col-auto">
              <small>
                <a
                  href="https://www.utk.edu/apply/"
                  className="nav-link px-0 text-light text-uppercase"
                >
                  Apply
                </a>
              </small>
            </li>
            <li className="col-auto">
              <small>
                <a
                  href="https://www.utk.edu/give/"
                  className="nav-link px-0 text-light text-uppercase"
                >
                  Give
                </a>
              </small>
            </li>
            <li className="col-auto">
              {' '}
              <button
                type="button"
                id="btn-searchopen"
                className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed px-0"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
                aria-label="Toggle search"
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
                </svg>
                <span>Search</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <header id="masthead" className="site-header">
        <div className="container-xxl">
          <div className="row justify-content-between py-3 py-md-4 py-lg-0">
            <div className="col-5 col-sm-6 col-md-6 col-lg-2 col-xl-3 align-items-center">
              <Link href="/">
                <a className="d-grid h-100 mt-lg-2">
                  <img
                    src="/images/chrome/logo-horizontal-left-smokey.svg"
                    alt="University of Tennessee, Knoxville"
                  />
                </a>
              </Link>
            </div>

            <button
              className="navbar-toggler col-auto mr-auto"
              type="button"
              id="mobile-menu-open"
              data-toggle="#site-navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"></path>
              </svg>
              <span className="visually-hidden">Menu</span>
            </button>

            <nav
              id="site-navigation"
              className="navbar-horizontal col-auto g-0"
            >
              <button
                className="navbar-toggler"
                type="button"
                id="mobile-menu-close"
                data-toggle="collapse"
                data-target="#site-navigation"
                aria-controls="site-navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
                <span className="visually-hidden">Close Menu</span>
              </button>

              <div className="menu-main-site-container">
                {primaryNavItems.length > 0 && (
                  <ul id="primary-menu" className="list-unstyled">
                    {primaryNavItems}
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {secondaryNavItems.length > 0 && (
        <nav className="navbar-horizontal col-auto">
          <ul id="secondary-menu" className="nav justify-content-center">
            {secondaryNavItems}
          </ul>
        </nav>
      )}

      <div className="container-fluid mb-0 px-0">
        <div
          className="alert bg-gray2 text-center p-1 mb-0 border-0"
          role="alert"
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-info-circle mb-1"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </span>
          <Link href="/coronavirus/">
            <a className="text-center text-decoration-none text-reset home-covid-banner">
              COVID-19 Information and Support{' '}
              <span aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-chevron-right mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <nav id="universal-header">
              <div className="container">
                <ul className="row justify-content-end list-inline mb-0">
                  <li className="col-auto">
                    <small>
                      <a
                        href="https://www.utk.edu/requestinfo/"
                        className="nav-link px-0 text-light text-uppercase text-small text-white btn-request"
                      >
                        Request Info
                      </a>
                    </small>
                  </li>
                  <li className="col-auto">
                    <small>
                      <a
                        href="https://www.utk.edu/visit/"
                        className="nav-link px-0 text-light text-uppercase"
                      >
                        Visit
                      </a>
                    </small>
                  </li>
                  <li className="col-auto">
                    <small>
                      <a
                        href="https://www.utk.edu/apply/"
                        className="nav-link px-0 text-light text-uppercase"
                      >
                        Apply
                      </a>
                    </small>
                  </li>
                  <li className="col-auto">
                    <small>
                      <a
                        href="https://www.utk.edu/give/"
                        className="nav-link px-0 text-light text-uppercase"
                      >
                        Give
                      </a>
                    </small>
                  </li>
                  <li className="col-auto">
                    <button
                      type="button"
                      className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed"
                      id="btn-searchclose"
                      data-bs-toggle="modal"
                      data-bs-target="#searchModal"
                      aria-label="Toggle search"
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
                      <span>Close</span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="modal-body">
              <div className="container-xxl">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-10 col-lg-6">
                    <h1 className="text-center mt-md-5 mb-2 mb-md-5 fw-lighter">
                      Search
                    </h1>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-12 col-xl-8">
                    <ul
                      className="nav nav-pills justify-content-center justify-content-lg-start"
                      id="searchTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="this-site-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#this-site"
                          type="button"
                          role="tab"
                          aria-controls="this-site"
                          aria-selected="true"
                        >
                          Search utk.edu
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="events-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#events"
                          type="button"
                          role="tab"
                          aria-controls="events"
                          aria-selected="false"
                        >
                          Events
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="news-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#news"
                          type="button"
                          role="tab"
                          aria-controls="news"
                          aria-selected="false"
                        >
                          News
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="dir-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#dir"
                          type="button"
                          role="tab"
                          aria-controls="dir"
                          aria-selected="false"
                        >
                          Directory
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          href="https://www.utk.edu/alpha"
                        >
                          A-Z Index
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="https://maps.utk.edu">
                          Map
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="this-site"
                        role="tabpanel"
                        aria-labelledby="this-site-tab"
                      >
                        <form
                          className="form-inline hidden-print mt-4"
                          id="cse-searchbox-form"
                        >
                          <div className="mb-3 input-group">
                            <label
                              className="sr-only visually-hidden"
                              htmlFor="q"
                            >
                              Search
                            </label>
                            <input
                              type="search"
                              className="form-control"
                              title="Search utk.edu"
                              placeholder="Example: Apply, Payroll, Provost, English Department"
                              name="q"
                              id="q"
                            />
                            <button
                              type="submit"
                              name="btnG"
                              className="btn btn-secondary"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                              </svg>{' '}
                              <span className="visually-hidden">Search</span>
                            </button>
                          </div>
                        </form>

                        <div
                          className="gcse-searchresults-only"
                          data-gname="this-site-results"
                          //@ts-ignore
                          data-enableImageSearch="false"
                          //@ts-ignore
                          data-enableOrderBy="false"
                        ></div>
                      </div>
                      <div
                        className="tab-pane"
                        id="events"
                        role="tabpanel"
                        aria-labelledby="events-tab"
                      >
                        <form
                          className="form-inline hidden-print mt-4"
                          id="events-searchbox-form"
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
                              name="q-events"
                              id="q-events"
                            />
                            <button
                              type="submit"
                              name="btnG"
                              className="btn btn-secondary"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                              </svg>{' '}
                              <span className="visually-hidden">Search</span>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        className="tab-pane"
                        id="news"
                        role="tabpanel"
                        aria-labelledby="news-tab"
                      >
                        <form
                          className="form-inline hidden-print mt-4"
                          id="news-searchbox-form"
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
                              name="q-news"
                              id="q-news"
                            />
                            <button
                              type="submit"
                              name="btnG"
                              className="btn btn-secondary"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                              </svg>{' '}
                              <span className="visually-hidden">Search</span>
                            </button>
                          </div>
                        </form>
                      </div>

                      <div
                        className="tab-pane"
                        id="dir"
                        role="tabpanel"
                        aria-labelledby="dir-tab"
                      >
                        <form
                          className="form-inline hidden-print mt-4"
                          id="dir-searchbox-form"
                          method="post"
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
                            <button
                              type="submit"
                              name="btnG"
                              className="btn btn-secondary"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                              </svg>{' '}
                              <span className="visually-hidden">Search</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="site-footer  mt-auto">
              <div className="container-fluid universal-footer">
                <div className="container">
                  <div className="row py-3 pt-md-3 pb-md-0 justify-content-center">
                    <div className="site-info col-12 col-md-6 col-lg-8"> </div>
                    <div className="col-6 col-md-6 col-lg-4 ms-lg-auto mt-md-n5 p-1 p-md-3 utk-identifier">
                      {' '}
                      <a
                        href="https://www.utk.edu/"
                        className="align-self-center"
                      >
                        {' '}
                        Logo SVG here
                      </a>{' '}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
