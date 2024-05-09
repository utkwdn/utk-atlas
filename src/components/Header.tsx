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
  const [activeSubmenu, setActiveSubmenu] = useState('');

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

  console.log(links);

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
  // const primaryNavItems = links.flatMap((link) => {
  //   const parentId = link?.parentId;

  //   const id = link?.id;
  //   const url = link?.url;
  //   /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
  //   const itemUri = link?.uri;
  //   const label = link?.label;
  //   const children = link?.childItems?.nodes || [];

  //   const hasChildren = children.length > 0;

  //   /** mobile-only sub-nav items for this primary-nav item (will be an empty array if there are none) */
  //   const subNavItems = children.flatMap((child) => {
  //     const childLabel = child?.label;
  //     const childUrl = child?.url;
  //     /** Will be same as `childUrl` if external link, but root-relative path (with trailing slash) if internal link. */
  //     const childUri = child?.uri;
  //     const childId = child?.id;

  //     const childIsInternal = childUrl !== childUri;
  //     const childIsCurrent = childId === currentSecondLevelItemId;

  //     return childLabel && childUrl && childUri && childId ? (
  //       <li key={childId} className={childIsCurrent ? 'current' : ''}>
  //         {childIsInternal ? (
  //           <Button
  //             href={childUri}
  //             {...(childIsCurrent ? { 'aria-current': 'true' } : {})}
  //           >
  //             {childLabel}
  //           </Button>
  //         ) : (
  //           <a href={childUri}>{childLabel}</a>
  //         )}
  //       </li>
  //     ) : (
  //       []
  //     );
  //   });

  //   const isInternal = url !== itemUri;

  //   const isCurrent = id === currentTopLevelItemId;
  //   const currentClasses = isCurrent ? '' : '';

  //   const hasChildrenClasses = hasChildren ? '' : '';

  //   return !parentId && id && url && itemUri && label ? (
  //     <li key={id} className={`${currentClasses} ${hasChildrenClasses}`.trim()}>
  //       {isInternal ? (
  //         <Link
  //           href={itemUri}
  //           {...(isCurrent ? { 'aria-current': 'true' } : {})}
  //         >
  //           <span className="bold-holder">
  //             <span className="real-title">{label}</span>
  //             <span className="bold-wrapper" aria-hidden="true">
  //               {label}
  //             </span>
  //           </span>
  //         </Link>
  //       ) : (
  //         <a href={itemUri} className="bold-holder">
  //           <span className="bold-holder">
  //             {' '}
  //             <span className="real-title"> {label}</span>
  //           </span>
  //         </a>
  //       )}
  //       {subNavItems.length > 0 && (
  //         <div className="dropdown-menu ">
  //           <ul>{subNavItems}</ul>
  //         </div>
  //       )}
  //     </li>
  //   ) : (
  //     []
  //   );
  // });

  /** Desktop-only section-nav items (will be an empty array if there are none) */
  // const secondaryNavItems = (
  //   currentTopLevelItem?.childItems?.nodes || []
  // ).flatMap((link) => {
  //   const url = link?.url;
  //   /** Will be same as `url` if external link, but root-relative path (with trailing slash) if internal link. */
  //   const itemUri = link?.uri;
  //   const label = link?.label;
  //   const id = link?.id;

  //   // const isInternal = itemUri !== url;
  //   const isInternal = Array.from(itemUri as string)[0] === '/';
  //   const isCurrent = id === currentSecondLevelItemId;

  //   return url && itemUri && label && id ? (
  //     <div className={isCurrent ? 'dropdown-menu show' : ''}>
  //       <li key={id} className={isCurrent ? 'current-menu-item dropdown' : ''}>
  //         {isInternal ? (
  //           <Link
  //             href={itemUri}
  //             {...(isCurrent ? { 'aria-current': 'true' } : {})}
  //           >
  //             {label}
  //           </Link>
  //         ) : (
  //           <a href={itemUri}>{label}</a>
  //         )}
  //       </li>
  //     </div>
  //   ) : (
  //     []
  //   );
  // });

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

  // console.log(links);

  return (
    <>
      <header className="site-header">
        <UniversalHeader />

        <div className="wp-block-group header-site-title-wrapper universal-header__inner-blocks is-layout-flow wp-block-group-is-layout-flow"></div>

        <div
          id="main-nav--large"
          className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper main-nav--large"
        >
          <menu id="" className="utk-nav-menu">
            {links
              ?.filter((link) => link.parentId === null)
              ?.map((this_link, i) => {
                const subItems = this_link.childItems?.nodes;
                const subItemCount = this_link.childItems?.nodes.length || 0;
                const hasSubItems = subItemCount > 0;
                const linkAddress = this_link.uri || '';
                const linkLabel = this_link.label || '';
                const isExpanded = activeSubmenu === linkLabel;
                const isTopLevelActive = this_link.id === currentTopLevelItemId;
                const isInternalTop = this_link.uri !== this_link.url;
                return hasSubItems ? (
                  <li key={this_link.id} onBlur={() => setActiveSubmenu('')}>
                    <button
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                      aria-expanded={isExpanded ? 'true' : 'false'}
                      aria-current={isTopLevelActive ? 'page' : 'false'}
                      className={
                        isExpanded ? 'dropdown-toggle' : 'dropdown-toggle show'
                      }
                      onClick={() =>
                        setActiveSubmenu(isExpanded ? '' : linkLabel)
                      }
                    >
                      <span className="bold-holder">
                        <span className="real-title">{linkLabel}</span>
                        <span className="bold-wrapper" aria-hidden="true">
                          {linkLabel}
                        </span>
                      </span>
                    </button>
                    <div
                      id={linkLabel}
                      className="dropdown-menu"
                      style={{
                        visibility: isExpanded ? 'visible' : 'hidden',
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      <ul style={{ paddingLeft: 0, marginBottom: 0 }}>
                        <li className=" dropdown">
                          {isInternalTop ? (
                            <Link
                              href={linkAddress}
                              aria-current={
                                isTopLevelActive &&
                                currentSecondLevelItemId === null
                                  ? 'page'
                                  : 'false'
                              }
                            >
                              <span className="bold-holder">
                                <span className="real-title">
                                  {linkLabel} Overview
                                </span>
                                <span
                                  className="bold-wrapper"
                                  aria-hidden="true"
                                >
                                  {linkLabel} Overview
                                </span>
                              </span>
                            </Link>
                          ) : (
                            <a
                              href={linkAddress}
                              aria-current={
                                isTopLevelActive &&
                                currentSecondLevelItemId === null
                                  ? 'page'
                                  : 'false'
                              }
                            >
                              <span className="bold-holder">
                                <span className="real-title">
                                  {linkLabel} Overview
                                </span>
                                <span
                                  className="bold-wrapper"
                                  aria-hidden="true"
                                >
                                  {linkLabel} Overview
                                </span>
                              </span>
                            </a>
                          )}
                        </li>
                        {subItems?.map((this_item, i) => {
                          const subItemLink = this_item.uri || '';
                          const subItemLabel = this_item.label || '';
                          const isSecondLevelActive =
                            this_item.id === currentSecondLevelItemId;
                          const isInternalSecondary =
                            this_item.uri !== this_item.url;
                          return (
                            <li className=" dropdown" key={this_item.id}>
                              {isInternalSecondary ? (
                                <Link
                                  href={subItemLink}
                                  aria-current={
                                    isSecondLevelActive ? 'page' : 'false'
                                  }
                                >
                                  <span className="bold-holder">
                                    <span className="real-title">
                                      {subItemLabel}
                                    </span>
                                    <span
                                      className="bold-wrapper"
                                      aria-hidden="true"
                                    >
                                      {subItemLabel}
                                    </span>
                                  </span>
                                </Link>
                              ) : (
                                <a
                                  href={subItemLink}
                                  aria-current={
                                    isSecondLevelActive ? 'page' : 'false'
                                  }
                                >
                                  <span className="bold-holder">
                                    <span className="real-title">
                                      {subItemLabel}
                                    </span>
                                    <span
                                      className="bold-wrapper"
                                      aria-hidden="true"
                                    >
                                      {subItemLabel}
                                    </span>
                                  </span>
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={this_link.id}>
                    {isInternalTop ? (
                      <Link
                        href={linkAddress}
                        aria-current={isTopLevelActive ? 'page' : 'false'}
                      >
                        <span className="bold-holder">
                          <span className="real-title">{linkLabel}</span>
                          <span className="bold-wrapper" aria-hidden="true">
                            {linkLabel}
                          </span>
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={linkAddress}
                        aria-current={isTopLevelActive ? 'page' : 'false'}
                      >
                        <span className="bold-holder">
                          <span className="real-title">{linkLabel}</span>
                          <span className="bold-wrapper" aria-hidden="true">
                            {linkLabel}
                          </span>
                        </span>
                      </a>
                    )}
                  </li>
                );
              })}
          </menu>
        </div>
      </header>

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
