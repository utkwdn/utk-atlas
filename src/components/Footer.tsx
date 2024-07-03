import React from 'react';
// import styles from 'scss/components/Footer.module.scss';
import Link from 'next/link';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { FooterToolsQuery } from '../__generated__/graphql';

interface Props {
  dynamicSrc?: string;
}
function Footer({ dynamicSrc }: Props): JSX.Element {
  const queryResults = useQuery(Footer.query);
  const footerQueryData: FooterToolsQuery | undefined = queryResults.data;

  const tools = footerQueryData?.toolsItems?.nodes || [];
  const links = footerQueryData?.linksItems?.nodes || [];

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

  return (
    <footer id="colophon" className="site-footer  mt-auto">
      <div className="container-fluid universal-footer" id="universal-footer">
        <div className="container-xxl">
          <div className="row pt-3">
            <div className="site-info col-12 col-md-7 col-lg-8">
              <div className="col-auto">
                <div className="row">
                  <div className="col-6 footer-menu">
                    <h2 className="text-white h4">Tools</h2>
                    <ul id="list-unstyled" className="list-unstyled">
                      {tools.flatMap((tool) => {
                        const label = tool?.label;
                        const url = appendDynamicSrc(tool?.url || '');

                        if (label && url) {
                          return (
                            <li key={`${label}$-menu`}>
                              {/* Using <a> instead of <Link> to prevent scrolling issue in Firefox and Edge */}
                              {/* <Link href={url}> */}
                              <Link
                                href={url}
                                className="text-white footer-links"
                              >
                                {label}
                              </Link>
                              {/* </Link> */}
                            </li>
                          );
                        } else {
                          return [];
                        }
                      })}
                    </ul>
                  </div>
                  <div className="col-6 footer-menu">
                    <h2 className="text-white h4">Campus Links</h2>
                    <ul className="list-unstyled">
                      {links.flatMap((link) => {
                        const label = link?.label;
                        const url = appendDynamicSrc(link?.url || '');
                        if (label && url) {
                          return (
                            <li key={`${label}$-menu`}>
                              {/* Using <a> instead of <Link> to prevent scrolling issue in Firefox and Edge */}
                              {/* <Link href={url}> */}
                              <Link
                                href={url}
                                className="text-white footer-links"
                              >
                                {label}
                              </Link>
                              {/* </Link> */}
                            </li>
                          );
                        } else {
                          return [];
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row row-cols-2 row-cols-sm-4 row-cols-md-2 row-cols-lg-4 g-2  py-5 social-links">
                <a
                  className="text-start col twitter text-white footer-links"
                  href="http://twitter.com/utknoxville"
                >
                  <svg
                    fill="currentColor"
                    width="24.39"
                    height="24.16"
                    viewBox="0 0 24.39 24.16"
                  >
                    <path d="M13.99,10.37L21.76,1.33h-1.84l-6.75,7.85L7.78,1.33H1.56l8.15,11.86L1.56,22.67h1.84l7.13-8.29,5.69,8.29h6.22l-8.45-12.3h0ZM11.46,13.3l-.83-1.18L4.07,2.72h2.83l5.3,7.59.83,1.18,6.89,9.86h-2.83l-5.63-8.05h0Z"></path>
                  </svg>{' '}
                  <span className="">X/Twitter</span>
                </a>
                <a
                  className="text-start col facebook text-white footer-links"
                  href="http://facebook.com/utknoxville"
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0v24h24v-24h-24zm16 7h-1.923c-.616 0-1.077.252-1.077.889v1.111h3l-.239 3h-2.761v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"></path>
                  </svg>{' '}
                  <span className="">Facebook</span>
                </a>
                <a
                  className="text-start col youtube text-white footer-links"
                  href="https://www.youtube.com/user/UniversityTennessee"
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-9.333v24h-24v-24h24zm-4 12c-.02-4.123-.323-5.7-2.923-5.877-2.403-.164-7.754-.163-10.153 0-2.598.177-2.904 1.747-2.924 5.877.02 4.123.323 5.7 2.923 5.877 2.399.163 7.75.164 10.153 0 2.598-.177 2.904-1.747 2.924-5.877z"></path>
                  </svg>{' '}
                  <span className="">YouTube</span>
                </a>
                <a
                  className="text-start col instagram text-white footer-links"
                  href="http://instagram.com/utknoxville"
                >
                  <svg
                    fill="currentColor"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>{' '}
                  <span className="">Instagram</span>
                </a>
              </div>
            </div>

            <div className="utk-identifier col-12 col-md-5 col-lg-4 ms-lg-auto mt-md-n5 p-4">
              <Link href="/" className="mb-4 d-block">
                <img
                  src="/images/chrome/logo-horizontal-left-white.svg"
                  alt="University of Tennessee, Knoxville"
                />
              </Link>

              <p className="text-white small" style={{ margin: 0 }}>
                The University of Tennessee
              </p>
              <p className="text-white small" style={{ margin: 0 }}>
                Knoxville, Tennessee 37996
              </p>
              <p className="text-white small">865-974-1000</p>
              <p className="text-white small">
                The flagship campus of the{' '}
                <a
                  href="https://tennessee.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white footer-links"
                >
                  University of Tennessee System
                </a>{' '}
                and partner in the{' '}
                <a
                  href="https://www.tntransferpathway.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white footer-links"
                >
                  Tennessee Transfer Pathway
                </a>
                .
              </p>
              <p className="text-white small">
                <a
                  className="text-white me-3 footer-links"
                  href="https://dae.utk.edu/eoa/ada/"
                >
                  ADA
                </a>
                <Link
                  href={appendDynamicSrc('/about/privacy/')}
                  className="text-white me-3 footer-links"
                >
                  Privacy
                </Link>{' '}
                <a
                  className="text-white me-3 footer-links"
                  href="https://safety.utk.edu/"
                >
                  Safety
                </a>{' '}
                <a
                  className="text-white footer-links"
                  href="https://titleix.utk.edu/"
                >
                  Title&nbsp;IX
                </a>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.query = gql(`
  query FooterTools {
    toolsItems: menuItems(where: { location: TOOLS }) {
      nodes {
        url
        label
      }
    }
    linksItems: menuItems(where: { location: LINKS }) {
      nodes {
        url
        label
      }
    }
  }
`);

export default Footer;
