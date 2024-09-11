import styles from 'scss/components/SkipLink.module.scss';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { MainNavQuery } from '../__generated__/graphql';
import UniversalHeader from './UniversalHeader';
import { useRouter } from 'next/router';

interface Props {
  dynamicSrc?: string;
}
const Header = ({ dynamicSrc }: Props) => {
  const [alertDisplay, setAlertDisplay] = useState('none');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertDate, setAlertDate] = useState('');
  const [activeSubmenu, setActiveSubmenu] = useState('');

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

  const queryResults = useQuery(Header.query);
  const navQueryData: MainNavQuery | undefined = queryResults.data;

  const links = navQueryData?.menuItems?.nodes || [];

  {
    /* render placeholder nav while fetching WP nav items to reduce layout shift */
  }
  const placeholderNav = () => {
    return (
      <>
        <li>
          <button
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
            aria-current="false"
            className="dropdown-toggle show main-navigation"
          >
            <span className="bold-holder">
              <span className="real-title">About</span>
              <span className="bold-wrapper" aria-hidden="true">
                About
              </span>
            </span>
          </button>
        </li>
        <li>
          <button
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
            aria-current="false"
            className="dropdown-toggle show main-navigation"
          >
            <span className="bold-holder">
              <span className="real-title">Academics and Programs</span>
              <span className="bold-wrapper" aria-hidden="true">
                Academics and Programs
              </span>
            </span>
          </button>
        </li>
        <li>
          <button
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
            aria-current="false"
            className="dropdown-toggle show main-navigation"
          >
            <span className="bold-holder">
              <span className="real-title">Admissions and Aid</span>
              <span className="bold-wrapper" aria-hidden="true">
                Admissions and Aid
              </span>
            </span>
          </button>
        </li>
        <li>
          <a
            aria-current="false"
            className="main-navigation"
            href="/campus-life"
          >
            <span className="bold-holder">
              <span className="real-title">Campus Life</span>
              <span className="bold-wrapper" aria-hidden="true">
                Campus Life
              </span>
            </span>
          </a>
        </li>
        <li>
          <a
            href="https://research.utk.edu"
            aria-current="false"
            className="main-navigation"
          >
            <span className="bold-holder">
              <span className="real-title">Research</span>
              <span className="bold-wrapper" aria-hidden="true">
                Research
              </span>
            </span>
          </a>
        </li>
      </>
    );
  };

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

  const appendDynamicSrc = (linkAddress: string) => {
    const isInternal =
      linkAddress &&
      (linkAddress.startsWith('https://www.utk.edu') ||
        linkAddress.startsWith('https://utk.edu') ||
        linkAddress.startsWith('/'));
    const dynamicSrcIsSet = typeof dynamicSrc === 'string' && dynamicSrc !== '';

    if (isInternal && dynamicSrcIsSet) {
      return linkAddress + `?dmc=${dynamicSrc}`;
    } else {
      return linkAddress;
    }
  };

  useEffect(() => {
    fetchAlert();
  }, []);

  return (
    <>
      <a className={styles.skipLink} href="#skip-link-target">
        Skip to content
      </a>

      <header className="site-header">
        <UniversalHeader
          links={links}
          dynamicSrc={dynamicSrc || ''}
          currentTopLevelItemId={currentTopLevelItemId}
          currentSecondLevelItemId={currentSecondLevelItemId}
        />

        <div className="wp-block-group header-site-title-wrapper universal-header__inner-blocks is-layout-flow wp-block-group-is-layout-flow"></div>

        <div
          id="main-nav--large"
          className="wp-block-utk-wds-nav-menu utk-nav-menu-wrapper main-nav--large"
        >
          <menu id="" className="utk-nav-menu">
            {/* render placeholder nav while fetching WP nav items to reduce layout shift */}
            {links.length > 0 ? (
              <>
                {links
                  ?.filter((link) => link.parentId === null)
                  ?.map((this_link) => {
                    const subItems = this_link.childItems?.nodes;
                    const subItemCount = subItems?.length || 0;
                    const hasSubItems = subItemCount > 0;
                    const isInternalTop = this_link.uri !== this_link.url;
                    // If dynamicSrc is set, append to end of internal links
                    const linkAddress = appendDynamicSrc(this_link.uri || '');
                    const linkLabel = this_link.label || '';
                    const isExpanded = activeSubmenu === linkLabel;
                    const isTopLevelActive =
                      this_link.id === currentTopLevelItemId;

                    return hasSubItems ? (
                      // <li key={this_link.id} onBlur={() => setActiveSubmenu('')}>
                      <li key={this_link.id}>
                        <button
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded={isExpanded ? 'true' : 'false'}
                          aria-current={isTopLevelActive ? 'page' : 'false'}
                          className={
                            isExpanded
                              ? 'dropdown-toggle main-navigation'
                              : 'dropdown-toggle show main-navigation'
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
                                  className="main-sub-navigation"
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
                                  className="main-sub-navigation"
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
                            {subItems?.map((this_item) => {
                              const isInternalSecondary =
                                this_item.uri !== this_item.url;
                              // If dynamicSrc is set, append to end of internal links
                              const subItemLink = appendDynamicSrc(
                                this_item.uri || ''
                              );
                              // const subItemLink =
                              //   isInternalSecondary &&
                              //   dynamicSrc &&
                              //   dynamicSrc !== ''
                              //     ? `${this_item.uri}?dmc=${dynamicSrc}`
                              //     : this_item.uri || '';
                              const subItemLabel = this_item.label || '';
                              const isSecondLevelActive =
                                this_item.id === currentSecondLevelItemId;

                              return (
                                <li className=" dropdown" key={this_item.id}>
                                  {isInternalSecondary ? (
                                    <Link
                                      href={subItemLink}
                                      className="main-sub-navigation"
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
                                      className="main-sub-navigation"
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
                            className="main-navigation"
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
                            className="main-navigation"
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
              </>
            ) : (
              placeholderNav()
            )}
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
