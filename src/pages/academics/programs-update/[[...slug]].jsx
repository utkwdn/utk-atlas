import Layout from '../../../components/Layout';
import styles from 'scss/pages/Programs.module.scss';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { gql } from '../../../__generated__';
import { useQuery } from '@apollo/client';
import { matchSorter } from 'match-sorter';
import TextField from '@mui/material/TextField';
// import { Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import Intro from '../../../components/Intro';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import programsHero from '/public/images/programs-hero.jpg';

function Programs() {
  const [activeItems, setActiveItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(Programs.query);
  const programs = data?.programs?.nodes;
  // console.log(programs);

  const transformProgramsData = (programs) => {
    const activeItemsMap = new Map();

    programs.forEach(({ majors, degrees, title, areasOfStudy, colleges }) => {
      const majorName = majors.nodes[0]?.name;
      if (!majorName || degrees.nodes.length === 0) return;

      // Replace "C3" and "C4" with their corresponding certificate names
      const degreeList = degrees.nodes
        .map(({ name }) =>
          name === 'C3'
            ? 'Undergraduate Certificate'
            : name === 'C4'
            ? 'Graduate Certificate'
            : name
        )
        .sort();

      // Create a unique key based on major and sorted degree list
      const key = `${majorName}-${degreeList.join('|')}`;

      if (!activeItemsMap.has(key)) {
        activeItemsMap.set(key, {
          majorName,
          degrees: new Set(degreeList),
          concentrations: new Set(),
          areasOfStudy: new Set(),
          colleges: new Set(),
        });
      }

      const item = activeItemsMap.get(key);
      item.concentrations.add(title);
      areasOfStudy.nodes.forEach(({ name }) => item.areasOfStudy.add(name));
      colleges.nodes.forEach(({ name }) => item.colleges.add(name));
    });

    return Array.from(activeItemsMap.values())
      .map(
        ({ majorName, degrees, concentrations, areasOfStudy, colleges }) => ({
          majorName,
          degrees: Array.from(degrees),
          concentrations: Array.from(concentrations),
          areasOfStudy: Array.from(areasOfStudy),
          colleges: Array.from(colleges),
        })
      )
      .sort((a, b) => a.majorName.localeCompare(b.majorName)); // Sort alphabetically by majorName
  };

  useEffect(() => {
    if (programs) {
      setActiveItems(transformProgramsData(programs));
      console.log(transformProgramsData(programs));
      setIsLoading(false);
    }
  }, [programs]);

  return (
    <Layout>
      <Head>
        <title>Programs - University of Tennessee, Knoxville</title>
        <meta
          name="description"
          content="With 900+ programs, degrees, and certificates at UT, you can study what you love and be prepared for whatever awaits you after graduation."
        />
        <meta name="keywords" content="Degree Programs" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="30 days" />
        <link rel="canonical" href="https://www.utk.edu/academics/programs" />
      </Head>
      <Intro
        title={'Programs & degrees'}
        theme={'Prepare for your future'}
        intro={
          <div>
            <p>
              With 900+ programs, degrees, and certificates at UT, you can study
              what you love and be prepared for whatever awaits you after
              graduation.
            </p>
            <div className="fancyLinkGroup ch-md is-layout-flow">
              <p className="fancyLink stack-links">
                <a href={`https://utk.edu/requestinfo`} className="hero-cat">
                  Request info
                </a>
              </p>
            </div>
          </div>
        }
        imagesrc={programsHero}
        alt={
          'A professor and student install a structure on a 6 degrees-of-freedom shake table, which simulates an earthquake.'
        }
      />
      <section className={styles.areasContainer} id="filters">
        {/* parent container */}

        {/* Results Container */}
        {isLoading ? (
          <section className={styles.loadingContainer}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span style={{ marginLeft: '10px' }}>Loading Programs</span>
          </section>
        ) : (
          <>
            {activeItems.length > 0 ? (
              <section className={styles.resultsSection}>
                <table
                  className={styles.programsTable}
                  cellSpacing="0"
                  cellPadding="8"
                >
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Area of Study</th>
                      <th>Degree / Certificate</th>
                      <th>Concentration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeItems.map(
                      (
                        {
                          majorName,
                          degrees,
                          concentrations,
                          areasOfStudy,
                          colleges,
                        },
                        index
                      ) => (
                        <tr key={index}>
                          <td>
                            <div className={styles.tableColumnOne}>
                              <p>{majorName}</p>
                              <ul>
                                {colleges.map((college, idx) => (
                                  // <a href="#">
                                  <li key={idx}>{college}</li>
                                  // </a>
                                ))}
                              </ul>
                            </div>
                          </td>
                          <td>
                            <ul>
                              {areasOfStudy.map((area, idx) => (
                                // <a href="#">
                                <li key={idx}>{area}</li>
                                // </a>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {degrees.map((degree, idx) => (
                                <li key={idx}>
                                  <a href="#">{degree}</a>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {concentrations.map((concentration, idx) => (
                                <li key={idx}>{concentration}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </section>
            ) : (
              <section className={styles.resultsSectionMessage}>
                <h3>No matching programs</h3>
              </section>
            )}
          </>
        )}
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
          description
        }
      }
      majors {
        nodes {
          name
        }
      }
      programDetailsFields {
        url
      }
      date
    }
  }
}
`);

// export function getStaticProps(ctx: GetStaticPropsContext) {
//   return getNextStaticProps(ctx, { Page: Programs, revalidate: 120 });
// }

// export function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }
