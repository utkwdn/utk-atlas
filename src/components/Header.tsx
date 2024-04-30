// import styles from 'scss/components/Header.module.scss';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { gql, useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { MainNavQuery } from '../__generated__/graphql';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UniversalHeader from './UniversalHeader';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';

const MAIN_MENU_ID = 'main-menu';

/**
 * Closes the mobile menu if open. Not a very elegant or "React-y" way
 * of doing this, but it's simple and effective, and we're a bit limited
 * by the React-Bootstrap API here.
 */
const closeMenuIfOpen = () => {
  const mainMenu = document.querySelector(`#${MAIN_MENU_ID}`);
  if (!(mainMenu instanceof HTMLElement)) return;

  const mainMenuIsModal = mainMenu.hasAttribute('aria-modal');
  if (!mainMenuIsModal) return;

  const closeButton = mainMenu.querySelector(`.offcanvas-header button`);
  if (!(closeButton instanceof HTMLButtonElement)) return;

  closeButton.click();
};

const Header = () => {
  const [alertDisplay, setAlertDisplay] = useState('none');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertDate, setAlertDate] = useState('');

  const { asPath, events: routerEvents } = useRouter();

  // make sure that the mobile menu closes upon internal navigation
  useEffect(() => {
    routerEvents.on('routeChangeStart', closeMenuIfOpen);
    return () => {
      routerEvents.off('routeChangeStart', closeMenuIfOpen);
    };
  });

  const uri =
    asPath && asPath !== '/' ? asPath.split('?')[0].split('#')[0] + '/' : null;

  const uriParts = (uri || '').split('/').filter(Boolean);
  const firstUriPartRaw = uriParts[0];
  const secondUriPartRaw = uriParts[1];
  const firstUriPart = uriParts[0] ? `/${firstUriPartRaw}` : null;
  const secondUriPart = uriParts[1] ? `/${secondUriPartRaw}` : null;
  const firstTwoUriParts =
    firstUriPart && secondUriPart ? `${firstUriPart}${secondUriPart}` : null;

  const queryResults = useQuery(Header.query);
  const navQueryData: MainNavQuery | undefined = queryResults.data;

  const links = navQueryData?.menuItems?.nodes || [];

  /*
    I *think* these conditional data-selections are okay, because we get all
    the `link.uri` properties in `primaryNavItems` unconditionally.
    If they're NOT okay, we'll see client-side data-fetching in the built
    app, because of this: https://gqty.dev/docs/react/troubleshooting#data-selections--conditionals
  */
  const currentTopLevelItem = firstUriPart
    ? links.find((link) => link?.uri === `${firstUriPart}/`)
    : null;
  const currentTopLevelItemId = currentTopLevelItem?.id;
  const currentSecondLevelItemId = firstTwoUriParts
    ? links.find((link) => link?.uri === `${firstTwoUriParts}/`)?.id
    : null;

  /** Primary nav items (desktop and mobile) */
  const primaryNavItems = links.flatMap((link) => {
    const parentId = link?.parentId;

    const id = link?.id;
    const url = link?.url;
    /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
    const itemUri = link?.uri;
    const label = link?.label;
    const children = link?.childItems?.nodes || [];

    const hasChildren = children.length > 0;

    /** mobile-only sub-nav items for this primary-nav item (will be an empty array if there are none) */
    const subNavItems = children.flatMap((child) => {
      const childLabel = child?.label;
      const childUrl = child?.url;
      /** Will be same as `childUrl` if external link, but root-relative path (with trailing slash) if internal link. */
      const childUri = child?.uri;
      const childId = child?.id;

      const childIsInternal = childUrl !== childUri;
      const childIsCurrent = childId === currentSecondLevelItemId;

      return childLabel && childUrl && childUri && childId ? (
        <li key={childId} className={childIsCurrent ? 'dropdown' : ''}>
          {childIsInternal ? (
            <Link
              href={childUri}
              {...(childIsCurrent ? { 'aria-current': 'true' } : {})}
            >
              {childLabel}
            </Link>
          ) : (
            <a href={childUri}>{childLabel}</a>
          )}
        </li>
      ) : (
        []
      );
    });

    const isInternal = url !== itemUri;

    const isCurrent = id === currentTopLevelItemId;
    const currentClasses = isCurrent ? '' : '';

    const hasChildrenClasses = hasChildren ? '' : '';

    return !parentId && id && url && itemUri && label ? (
      <li key={id} className={`${currentClasses} ${hasChildrenClasses}`.trim()}>
        {isInternal ? (
          <Link
            href={itemUri}
            className="dropdown-toggle show"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            {...(isCurrent ? { 'aria-current': 'true' } : {})}
          >
            <span className="bold-holder">
              <span className="real-title">{label}</span>
              <span className="bold-wrapper" aria-hidden="true">
                {label}
              </span>
            </span>
          </Link>
        ) : (
          <a href={itemUri} className="bold-holder">
            <span className="bold-holder">
              {' '}
              <span className="real-title"> {label}</span>
            </span>
          </a>
        )}
        {subNavItems.length > 0 && (
          <div className="dropdown-menu ">
            <ul>{subNavItems}</ul>
          </div>
        )}
      </li>
    ) : (
      []
    );
  });

  /** Desktop-only section-nav items (will be an empty array if there are none) */
  const secondaryNavItems = (
    currentTopLevelItem?.childItems?.nodes || []
  ).flatMap((link) => {
    const url = link?.url;
    /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
    const itemUri = link?.uri;
    const label = link?.label;
    const id = link?.id;

    // const isInternal = itemUri !== url;
    const isInternal = Array.from(itemUri as string)[0] === '/';
    const isCurrent = id === currentSecondLevelItemId;

    return url && itemUri && label && id ? (
      <div className={isCurrent ? 'dropdown-menu show' : ''}>
        <li key={id} className={isCurrent ? 'current-menu-item dropdown' : ''}>
          {isInternal ? (
            <Link
              href={itemUri}
              {...(isCurrent ? { 'aria-current': 'true' } : {})}
            >
              {label}
            </Link>
          ) : (
            <a href={itemUri}>{label}</a>
          )}
        </li>
      </div>
    ) : (
      []
    );
  });

  // Checking UT Alerts RSS and displaying an alert if it exists
  function fetchAlert() {
    const url = 'https://www.getrave.com/rss/utk/channel1';
    const response = fetch(url)
      .then((response) => response.text())
      .then((result) => {
        // Parse returned xml string into DOM
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(result, 'text/xml');
        const itemCount = xmlDoc.getElementsByTagName('item').length;
        // Only assign alert values if items exist in xml
        if (itemCount > 0) {
          const lastItem = xmlDoc.getElementsByTagName('item')[itemCount - 1];
          const alertTitle =
            lastItem.getElementsByTagName('title')[0].textContent || '';
          const alertDescription =
            lastItem.getElementsByTagName('description')[0].textContent || '';
          const alertDate =
            lastItem.getElementsByTagName('dc:date')[0].textContent || '';
          const unformattedDate = new Date(alertDate);
          const d = unformattedDate.getDate();
          const m = unformattedDate.getMonth();
          const y = unformattedDate.getFullYear();
          const formattedAlertDate = `${m + 1}/${d}/${y}`;
          // Don't display alert if title includes 'RSS All Clear' or is blank
          if (alertTitle.includes('RSS All Clear') || alertTitle === '') {
            // console.log('No Current Alerts');
          } else {
            setAlertDisplay('block');
            setAlertDescription(alertDescription);
            setAlertDate(formattedAlertDate);
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  useEffect(() => {
    fetchAlert();
  }, []);

  return (
    <>
      <header className="site-header">
        <UniversalHeader />
        {/*
        Note: this NavBar was originally entirely non-React markup that came
        from the UTK design-system. However, because of the JavaScript needs of
        that design-system pattern, we had to "Reactify" it here (which we did
        with React-Bootstrap). But the styling was largely tied to the old markup,
        so we still had to preserve that old markup (with some modifications).

        In short: this piece relies in part on CSS from the UTK design-system. So
        if the design-system'sub main-nav is altered in the future, it will be important
        to check the behavior of this piece.
      */}
        {/* manually duplicating WDS 1.1.2 structure */}
        <div
          id="mobileMainNav"
          className="main-menu-wrapper offcanvas offcanvas-end"
          // tabindex="-1"
          data-max-breakpoint="600"
        >
          <div className="offcanvas-header">
            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="main-menu offcanvas-body">
            <div className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper utility-nav-menu-mobile">
              <menu id="utility-nav-menu-mobile" className="utk-nav-menu">
                {primaryNavItems}
              </menu>
            </div>
            <form
              id="cse-searchbox-form"
              className="form-inline hidden-print mt-4"
            >
              <div className="mb-3 input-group">
                <label className="sr-only visually-hidden" for="g">
                  Search
                </label>
                <input
                  id="site-search-field-offcanvas"
                  className="form-control"
                  type="search"
                  title="Search this site"
                  placeholder="Search"
                  name="s"
                ></input>
                <button className="btn btn-utlink" type="submit">
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
                </button>
              </div>
            </form>
            <div className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper main-nav-menu-list">
              <menu id="mobile-nav-menu" className="utk-nav-menu">
                <li className="collapsible-menu-item">
                  <a className="" href="#">
                    <span className="bold-holder">
                      <span className="real-title">Sample Page</span>
                      <span className="bold-wrapper" aria-hidden="true">
                        Sample Page 2
                      </span>
                    </span>
                  </a>
                </li>
              </menu>
            </div>
          </div>
        </div>
        <div className="wp-block-group header-site-title-wrapper universal-header__inner-blocks is-layout-flow wp-block-group-is-layout-flow"></div>
        <div
          id="main-nav--large"
          className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper main-nav--large"
        >
          <menu id="" className="utk-nav-menu">
            {primaryNavItems}
          </menu>
        </div>
        <Navbar
          expand="xl" /* important because it matches the breakpoint used for some styling inside */
          as="div" /* otherwise it's `nav` (and we already have a `nav` nested) */
          role="presentation" /* otherwise it defaults to "navigation" (b/c `as` isn't `nav`) */
          id="mobileMainNav"
          className="main-menu-wrapper offcanvas offcanvas-end"
        >
          <div className="wp-block-group header-size-title-wrapper universal header__inner-blocks is-layout-flow wp-block-group-is-layout-flow"></div>
          <div
            id="main-nav--large"
            className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper main-nav--large"
          >
            <menu className="utk-nav-menu">
              <Navbar.Toggle
                aria-controls={MAIN_MENU_ID}
                className="navbar-toggler col-auto mr-auto"
                id="mobile-menu-open"
                label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"></path>
                </svg>
              </Navbar.Toggle>

              <Navbar.Offcanvas
                id={MAIN_MENU_ID}
                placement="end"
                aria-label="Menu"
              >
                <Offcanvas.Header
                  className="justify-content-end"
                  closeButton
                  closeLabel="Close Menu"
                />

                <Offcanvas.Body className="justify-content-end">
                  <nav aria-label="Main">
                    <div className="menu-main-site-container">
                      {primaryNavItems.length > 0 && (
                        <ul id="primary-menu" className="list-unstyled mt-0">
                          {primaryNavItems}
                        </ul>
                      )}
                    </div>
                  </nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </menu>
          </div>
        </Navbar>
      </header>

      {secondaryNavItems.length > 0 && (
        <nav className="dropdown-menu">
          <ul id="" className="">
            {secondaryNavItems}
          </ul>
        </nav>
      )}

      {/* UT Alert Banner */}
      {/* Possibly add timer to refresh status at some point */}
      <div
        className="alert alert-primary alert-dismissible"
        role="alert"
        style={{
          display: alertDisplay, // Using state to show or hide alert
          backgroundColor: '#eaf0f3', // Pull out once stylesheet is finalized
          borderColor: '#cdcdcd', // Pull out once stylesheet is finalized
          zIndex: 999, // Prevents .video-flex element from overlaying and blocking interactivity
        }}
      >
        <div className="container">
          {/* <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setAlertDisplay('none')}
        ></button> */}
          <p className="alert-heading">{alertDescription}</p>
          <small>Posted on {alertDate}</small>
          <p>
            <a className="alert-link" href="https://safety.utk.edu/status/">
              See campus status.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

Header.query = gql(`
  query MainNav {
    menuItems(where: {location: PRIMARY}, first: 20) {
      nodes {
        id
        uri
        url
        title
        parentId
        label
        childItems {
          nodes {
            label
            id
            url
            uri
          }
        }
      }
    }
  }
`);

export default Header;
