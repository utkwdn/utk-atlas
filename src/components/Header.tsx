// import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UniversalHeader from './UniversalHeader';

interface Props {
  title?: string;
  description?: string;
  uri?: string;
}

const Header = ({ uri }: Props) => {
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
    </>
  );
};

export default Header;
