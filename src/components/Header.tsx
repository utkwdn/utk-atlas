// import styles from 'scss/components/Header.module.scss';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UniversalHeader from './UniversalHeader';
import { useRouter } from 'next/router';

const Header = () => {
  const [alertDisplay, setAlertDisplay] = useState('none');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertDate, setAlertDate] = useState('');
  const { asPath } = useRouter();
  const uri =
    asPath && asPath !== '/' ? asPath.split('?')[0].split('#')[0] + '/' : null;

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
    const children = link?.childItems()?.nodes || [];

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
        <li key={childId} className={childIsCurrent ? 'current-menu-item' : ''}>
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
      ) : (
        []
      );
    });

    const isInternal = url !== itemUri;

    const isCurrent = id === currentTopLevelItemId;
    const currentClasses = isCurrent
      ? 'current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor'
      : '';

    const hasChildrenClasses = hasChildren ? 'menu-item-has-children' : '';

    return !parentId && id && url && itemUri && label ? (
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
        {subNavItems.length > 0 && <ul className="sub-menu">{subNavItems}</ul>}
      </li>
    ) : (
      []
    );
  });

  /** Desktop-only section-nav items (will be an empty array if there are none) */
  const secondaryNavItems = (
    currentTopLevelItem?.childItems()?.nodes || []
  ).flatMap((link) => {
    const url = link?.url;
    /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
    const itemUri = link?.uri;
    const label = link?.label;
    const id = link?.id;

    const isInternal = itemUri !== url;
    const isCurrent = id === currentSecondLevelItemId;

    return url && itemUri && label && id ? (
      <li key={id} className={isCurrent ? 'current-menu-item' : ''}>
        {isInternal ? (
          <Link href={itemUri}>
            <a {...(isCurrent ? { 'aria-current': 'true' } : {})}>{label}</a>
          </Link>
        ) : (
          <a href={itemUri}>{label}</a>
        )}
      </li>
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
            console.log('No Current Alerts');
          } else {
            setAlertDisplay('block');
            setAlertDescription(alertDescription);
            setAlertDate(formattedAlertDate);
          }
        } else {
          console.log('No Current Alerts');
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
      <UniversalHeader />

      <header id="masthead" className="site-header">
        {/*
          Note: this NavBar was originally entirely non-React markup that came
          from the UTK design-system. However, because of the JavaScript needs of
          that design-system pattern, we had to "Reactify" it here (which we did
          with React-Bootstrap). But the styling was largely tied to the old markup,
          so we still had to preserve that old markup (with some modifications).

          In short: this piece relies in part on CSS from the UTK design-system. So
          if the design-system's main-nav is altered in the future, it will be important
          to check the behavior of this piece.
        */}
        <Navbar
          expand="lg" /* important because it matches the breakpoint used for some styling inside */
          as="div" /* otherwise it's `nav` (and we already have a `nav` nested) */
          role="presentation" /* otherwise it defaults to "navigation" (b/c `as` isn't `nav`) */
          className="py-0"
        >
          <div className="container-xxl">
            <div className="row justify-content-between py-3 py-md-4 py-lg-0 w-100">
              <div className="site-logo">
                <Link href="/">
                  <a className="d-grid h-100">
                    <img
                      src="/images/chrome/logo-horizontal-left-smokey.svg"
                      alt="University of Tennessee, Knoxville"
                    />
                  </a>
                </Link>
              </div>

              <Navbar.Toggle
                aria-controls="main-menu"
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
                id="main-menu"
                placement="start"
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
            </div>
          </div>
        </Navbar>
      </header>

      {secondaryNavItems.length > 0 && (
        <nav className="navbar-horizontal col-auto">
          <ul id="secondary-menu" className="nav justify-content-center">
            {secondaryNavItems}
          </ul>
        </nav>
      )}

      {/* UT Alert Banner */}
      <div
        className="alert alert-primary alert-dismissible"
        role="alert"
        style={{
          display: alertDisplay, // Using state to show or hide alert
          backgroundColor: '#dedede', // Pull out once stylesheet is finalized
          borderColor: '#cdcdcd', // Pull out once stylesheet is finalized
          zIndex: 999, // Prevents .video-flex element from overlaying and blocking interactivity
        }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setAlertDisplay('none')}
        ></button>
        <p className="alert-heading">{alertDescription}</p>
        <small>Posted on {alertDate}</small>
        <p>
          <a className="alert-link" href="https://safety.utk.edu">
            See campus status.
          </a>
        </p>
      </div>
    </>
  );
};

export default Header;
