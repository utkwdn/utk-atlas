import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import { PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import styles from 'scss/pages/social-hub.module.scss';
import Link from 'next/link';
import Head from 'next/head';

function Social() {
  const { data } = useQuery(Social.query);
  const socialUnits = data?.socialUnits?.nodes;

  return (
    <Layout>
      <Head>
        <title>Social Media Hub</title>
      </Head>
      <PageTitle title={'Social'} />
      <div className="container-xxl" style={{ padding: '3rem 0' }}>
        <div className="is-content-justification-center is-layout-flex wp-block-buttons">
          <div className="wp-block-button is-style-outline">
            <Link className="wp-block-button__link wp-element-button" href="#">
              Hub
            </Link>
          </div>
          <div className="wp-block-button is-style-outline">
            <Link
              className="wp-block-button__link wp-element-button"
              href="/hashtags"
            >
              Hashtag Guide
            </Link>
          </div>
          <div className="wp-block-button is-style-outline">
            <Link
              className="wp-block-button__link wp-element-button"
              href="/emojis"
            >
              Emojis
            </Link>
          </div>
        </div>

        <div
          className="getconnected is-content-justification-center is-layout-flex"
          style={{ justifyContent: 'center', marginTop: '2rem' }}
        >
          <a href="https://www.facebook.com/UTKnoxville" className="soc-icons">
            <svg
              id="soc-facebook"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              className={styles['facebook']}
            >
              <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm-3 7h-1.924C13.461 7 13 7.252 13 7.889V9h3l-.238 3H13v8h-3v-8H8V9h2V7.077C10 5.055 11.064 4 13.461 4H16v3z"></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/utknoxville/"
            className="soc-icons"
          >
            <svg
              id="soc-instagram"
              viewBox="0 0 512 512"
              width="100%"
              height="100%"
              className={styles['instagram']}
            >
              <path d="M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z"></path>
              <path d="M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z"></path>
              <circle cx="390.5" cy="121.5" r="30.2"></circle>
            </svg>
          </a>
          <a href="https://www.pinterest.com/utknoxville" className="soc-icons">
            <svg
              id="soc-pintrest"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              className={styles['pinterest']}
            >
              <path
                d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a href="https://twitter.com/utknoxville/" className="soc-icons">
            <svg
              id="soc-twitter"
              viewBox="0 0 24 24"
              width="25px"
              height="25px"
              className={styles['twitter']}
            >
              <path d="M13.99,10.37L21.76,1.33h-1.84l-6.75,7.85L7.78,1.33H1.56l8.15,11.86L1.56,22.67h1.84l7.13-8.29,5.69,8.29h6.22l-8.45-12.3h0ZM11.46,13.3l-.83-1.18L4.07,2.72h2.83l5.3,7.59.83,1.18,6.89,9.86h-2.83l-5.63-8.05h0Z"></path>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/user/UniversityTennessee"
            className="soc-icons"
          >
            <svg
              id="soc-youtube"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              className={styles['youtube']}
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"></path>
            </svg>
          </a>
          <a
            href="https://www.snapchat.com/add/utknoxville"
            className="soc-icons"
          >
            <svg
              id="soc-snapchat"
              viewBox="-295 169 432 432"
              width="100%"
              height="100%"
              className={styles['snapchat']}
            >
              <path d="M-79.4 168.6c-119.5 0-216.4 96.9-216.4 216.4s96.9 216.4 216.4 216.4S137 504.5 137 385 40.1 168.6-79.4 168.6zM81.4 471.3c-3.3 7.7-17.2 13.3-42.5 17.2-.8 1.1-1.7 5.2-2.3 7.6-.5 2.5-1.1 4.9-1.9 7.5-1.1 3.6-3.7 5.6-7.5 5.6h-.4c-1.8 0-4.2-.3-7.3-.9-4.9-1-10.3-1.8-17.2-1.8-4 0-8.2.3-12.3 1-8.2 1.4-15.1 6.3-23.2 12-11.5 8.1-24.5 17.4-44.4 17.4-.9 0-1.7 0-2.4-.1-.5 0-1.1.1-1.6.1-19.8 0-32.9-9.2-44.4-17.4-8-5.7-15-10.6-23.1-11.9-4.2-.7-8.3-1-12.4-1-7.2 0-13 1.1-17.2 2-2.8.6-5.2 1-7.3 1-5.1 0-7.1-3.1-7.8-5.7-.8-2.6-1.3-5.2-1.9-7.6-.5-2.5-1.4-6.5-2.3-7.7-25.3-3.9-39.2-9.6-42.5-17.3-.4-1-.7-2-.7-3-.2-3.4 2.2-6.4 5.6-7 43.9-7.2 63.7-52.3 64.5-54.2 0-.1.1-.2.1-.3 2.3-4.8 2.9-8.7 1.6-11.8-2.5-6-11.9-8.9-18.1-10.9-1.7-.5-3.3-1.1-4.7-1.6-15-5.9-17.1-12.7-16.2-17.4 1.2-6.5 9.1-10.8 15.7-10.8 1.9 0 3.6.4 5.1 1.1 5.6 2.6 10.6 4 14.9 4 3.2 0 5.2-.8 6.3-1.4-.1-2.6-.3-5.3-.5-7.9-1.4-21.9-3.1-49.3 4.1-65.3 21.3-47.8 66.5-51.5 79.8-51.5.4 0 5.6-.1 5.6-.1h.8c13.4 0 58.6 3.7 80 51.5 7.2 16.1 5.5 43.4 4.1 65.4l-.1.9c-.2 2.4-.3 4.7-.4 6.9 1 .6 2.8 1.2 5.4 1.4 4-.2 8.7-1.5 13.9-3.9 2.2-1 4.6-1.3 6.2-1.3 2.3 0 4.7.5 6.7 1.3 6 2.1 9.7 6.4 9.8 11.3.1 6.2-5.4 11.5-16.3 15.8-1.3.5-3 1-4.7 1.6-6.2 2-15.5 4.9-18.1 10.9-1.3 3.1-.8 7.1 1.6 11.8.1.1.1.2.2.3.8 1.9 20.6 47 64.5 54.2 3.4.6 5.8 3.6 5.6 7 .3 1 .1 2-.4 3z"></path>
            </svg>
          </a>
        </div>
        <div
          className="getconnected is-content-justification-center is-layout-flex"
          style={{ justifyContent: 'center', margin: '2rem 0' }}
        >
          <h3 className="is-content-justification-center">
            Social Media Accounts Across UT
          </h3>
        </div>

        <table className={`table ${styles['table-striped']}`}>
          <thead>
            <tr>
              <th>Unit Name</th>
              <th>X/Twitter</th>
              <th>Facebook</th>
              <th>Instagram</th>
              <th>YouTube</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {socialUnits?.map((this_unit, i) => {
              const title = this_unit?.title || '';
              const twitterLink = this_unit?.socialUnitURLs?.twitter;
              const facebookLink = this_unit?.socialUnitURLs?.facebook;
              const instagramLink = this_unit?.socialUnitURLs?.instagram;
              const youtubeLink = this_unit?.socialUnitURLs?.youtube;
              const linkedinLink = this_unit?.socialUnitURLs?.linkedin;
              return (
                <tr key={this_unit?.id}>
                  <td data-label="Unit">{title}</td>
                  <td data-label="X/Twitter">
                    {twitterLink ? (
                      <a href={twitterLink} target="_blank" rel="noreferrer">
                        <svg
                          id={`soc-twitter-${i}`}
                          viewBox="0 0 24 24"
                          width="25px"
                          height="25px"
                          className={styles['twitter']}
                        >
                          <path d="M13.99,10.37L21.76,1.33h-1.84l-6.75,7.85L7.78,1.33H1.56l8.15,11.86L1.56,22.67h1.84l7.13-8.29,5.69,8.29h6.22l-8.45-12.3h0ZM11.46,13.3l-.83-1.18L4.07,2.72h2.83l5.3,7.59.83,1.18,6.89,9.86h-2.83l-5.63-8.05h0Z"></path>
                        </svg>

                        <span
                          className={styles['sr-only']}
                        >{`${title}'s X/Twitter`}</span>
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td data-label="Facebook">
                    {facebookLink ? (
                      <a href={facebookLink} target="_blank" rel="noreferrer">
                        <svg
                          id={`soc-facebook-${i}`}
                          viewBox="0 0 24 24"
                          width="100%"
                          height="100%"
                          className={styles['facebook']}
                        >
                          <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm-3 7h-1.924C13.461 7 13 7.252 13 7.889V9h3l-.238 3H13v8h-3v-8H8V9h2V7.077C10 5.055 11.064 4 13.461 4H16v3z"></path>
                        </svg>

                        <span
                          className={styles['sr-only']}
                        >{`${title}'s Facebook`}</span>
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td data-label="Instagram">
                    {instagramLink ? (
                      <a href={instagramLink} target="_blank" rel="noreferrer">
                        <svg
                          id={`soc-instagram-${i}`}
                          viewBox="0 0 512 512"
                          width="100%"
                          height="100%"
                          className={styles['instagram']}
                        >
                          <path d="M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z"></path>
                          <path d="M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z"></path>
                          <circle cx="390.5" cy="121.5" r="30.2"></circle>
                        </svg>
                        <span
                          className={styles['sr-only']}
                        >{`${title}'s Instagram`}</span>
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td data-label="YouTube">
                    {youtubeLink ? (
                      <a href={youtubeLink} target="_blank" rel="noreferrer">
                        <svg
                          id={`soc-youtube-${i}`}
                          viewBox="0 0 24 24"
                          width="100%"
                          height="100%"
                          className={styles['youtube']}
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"></path>
                        </svg>
                        <span
                          className={styles['sr-only']}
                        >{`${title}'s YouTube`}</span>
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td data-label="LinkedIn">
                    {linkedinLink ? (
                      <a href={linkedinLink} target="_blank" rel="noreferrer">
                        <svg
                          id={`soc-linkedin-${i}`}
                          viewBox="0 0 24 24"
                          width="100%"
                          height="100%"
                          className={styles['linkedin']}
                        >
                          <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"></path>
                        </svg>
                        <span
                          className={styles['sr-only']}
                        >{`${title}'s LinkedIn`}</span>
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Social;

Social.query = gql(`
  query GetSocials {
    socialUnits(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        id
        title
        socialUnitURLs {
          twitter
          facebook
          instagram
          youtube
          linkedin
        }
      }
    }
  }
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, { Page: Social, revalidate: 120 });
}
