import Layout from '../../components/Layout';
import Head from 'next/head';
import Intro from '../../components/Intro';
import styles from 'scss/pages/Programs.module.scss';
// import Script from 'next/script';
// import { prependOnceListener } from 'process';
// import content from '../../_data/programs.json';

import { gql } from '../../__generated__';
import { useQuery } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';

function Programs() {

  const { data } = useQuery(Programs.query);
  console.log(data?.programs)
  // const socialUnits = data?.socialUnits?.nodes;
  return (
    <Layout>
      <Intro
        title={'Programs'}
        theme={'Find Your Passion'}
        intro={
          <p>
            So many options and paths to choose from. Find what makes you happy
            and live a great life.
          </p>
        }
      />

      <section className={styles.areasContainer}>
        {/* CONTENT HOLDER FOR CARDS */}

        {/* Individual Card 01 – 
         Card design that will be dynamically created for each based on available data of Areasofstudy
         Potentially 14 cards will eventually show */}
        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                CategoryA<span className={styles['oa-period']}>.</span>
                <br />
                CategoryB<span className={styles['oa-period']}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>description</p>
            <a className={[styles.btnTweak, 'btn-link'].join(' ')} href="#">
              Request Information
              {}
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>program</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>degrees</span>
                  college
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>program</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>degrees</span>
                  college
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>program</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>degrees</span>
                  college
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>program</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>degrees</span>
                  college
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>program</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>degrees</span>
                  college
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>program</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>degrees</span>
                  college
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* End of Individual Card 01 */}

        {/* Start of Individual Card 02 – 
  Eventually all cards past this point will be deleted when data is looped for Card 01 */}
        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles['oa-period']}>.</span>
                <br />
                Performance<span className={styles['oa-period']}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, 'btn-link'].join(' ')} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* End of Individual Card 02 */}
        {/* Start of Individual Card 03 */}
        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles['oa-period']}>.</span>
                <br />
                Performance<span className={styles['oa-period']}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, 'btn-link'].join(' ')} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* End of Individual Card 03 */}

        {/* Start of Individual Card 04 */}
        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles['oa-period']}>.</span>
                <br />
                Performance<span className={styles['oa-period']}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, 'btn-link'].join(' ')} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* End of Individual Card 04 */}
      </section>
      {/* End areasContainer */}
    </Layout>
  );
}

export default Programs;

Programs.query = gql(`
query GetPrograms {
  programs(first: 1000, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      link
      colleges {
        nodes {
          name
        }
      }
      areasOfStudy {
        nodes {
          name
        }
      }
      degrees {
        nodes {
          name
        }
      }
    }
  }
}
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, { Page: Programs, revalidate: 120 });
}