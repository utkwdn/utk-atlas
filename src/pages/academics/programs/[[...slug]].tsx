import Layout from '../../../components/Layout';
import styles from 'scss/pages/Programs.module.scss';
import { PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { gql } from '../../../__generated__';
import { useQuery } from '@apollo/client';
import { matchSorter } from 'match-sorter';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import Intro from '../../../components/Intro';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Program {
  major: string;
  concentration: string;
  college: string;
  areaOfStudy: string;
  degrees: string;
  degreeTypes: string;
  programLink: string;
}

interface Filters {
  [key: string]: string;
  search: string;
  areaOfStudy: string;
  college: string;
  degreeTypes: string;
}

function Programs() {
  // const searchInputRef = useRef<HTMLInputElement>(null);

  const [activeItems, setActiveItems] = useState([
    {
      major: '',
      concentration: '',
      college: '',
      areaOfStudy: '',
      degrees: '',
      degreeTypes: '',
      programLink: '#',
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    areaOfStudy: '',
    college: '',
    degreeTypes: '',
  });

  const { data } = useQuery(Programs.query);
  const programs = data?.programs?.nodes;

  const alphabetizeByMajor = (a: Program, b: Program) => {
    if (a.major < b.major) {
      return -1;
    }
    if (a.major > b.major) {
      return 1;
    }
    return 0;
  };

  // const router = useRouter();

  // if(router.query.slug && router.query.slug.length > 1) {
  //   const newFilterType = router.query.slug[0];
  //   const newFilterTerm = router.query.slug[1];

  //   if(filterType !== newFilterType) {
  //     setFilterType(newFilterType);
  //   }

  //   if(filterTerm !== newFilterTerm) {
  //     setFilterTerm(newFilterTerm);
  //   }
  // }

  const handleFilterChange = (filterType: string, value: string) => {
    const _filters: Filters = filters;
    _filters[filterType] = value;
    setFilters({ ..._filters });
    // console.log(filters);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleFilterChange('search', filters.search);
  };

  useEffect(() => {
    if (programs) {
      let flatPrograms = programs
        ?.map((program) => {
          const degreeString =
            program.degrees?.nodes
              ?.map(function (e) {
                return e.name;
              })
              .join(', ') || '';
          const degreeType =
            program.degrees?.nodes
              ?.map(function (e) {
                return e.description;
              })
              .join(', ') || '';

          return {
            major: program.majors?.nodes[0].name || '',
            concentration: program.title || '',
            college: program.colleges?.nodes[0].name || '',
            areaOfStudy: program.areasOfStudy?.nodes[0].name || '',
            degrees: degreeString,
            degreeTypes: degreeType,
            programLink: program.programDetailsFields?.url || '#',
          };
        })
        .sort(alphabetizeByMajor);

      // Apply any Search filters
      if (filters.search !== '') {
        flatPrograms = matchSorter(flatPrograms, filters.search, {
          keys: ['major', 'concentration', 'college', 'areaOfStudy', 'degrees'],
          threshold: matchSorter.rankings.ACRONYM,
        });
      }
      // Apply any Area of Study filters
      if (filters.areaOfStudy !== '') {
        flatPrograms = matchSorter(
          flatPrograms,
          filters.areaOfStudy.replaceAll('-', ' '),
          {
            keys: ['areaOfStudy'],
            threshold: matchSorter.rankings.EQUAL,
          }
        );
      }
      // Apply any College filters
      if (filters.college !== '') {
        flatPrograms = matchSorter(
          flatPrograms,
          filters.college.replaceAll('-', ' '),
          {
            keys: ['college'],
            threshold: matchSorter.rankings.ACRONYM,
          }
        );
      }
      // Apply any Degree Type filters
      if (filters.degreeTypes !== '') {
        flatPrograms = matchSorter(flatPrograms, filters.degreeTypes, {
          keys: ['degreeTypes'],
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
      }

      setActiveItems(flatPrograms);
    }
  }, [programs, filters]);

  return (
    <Layout>
      <Head>
        <title>Programs</title>
      </Head>
      {/* <PageTitle title={'Programs'} /> */}

      <Intro
        title={'Academics'}
        theme={'Find Your Future Program'}
        intro={
          <div>
            <p>
              Donec sed dolor justo. Sed eu diam at velit venenatis and this
              online courses risusvarius tellus.{' '}
            </p>
          </div>
        }
        imagesrc={
          'https://content.cms.utk.edu/wp-content/uploads/2023/11/hero-campus-life-03.jpg'
        }
        alt={'students'}
      />
      <section className={styles.areasContainer}>
        {/* parent container */}
        {/* Search Section */}
        <section className={styles.searchNavContainer}>
          <div className={styles.programsSearch}>
            <form
              onSubmit={(e) => handleSearchSubmit(e)}
              className={styles['alpha-form']}
            >
              <TextField
                onChange={(e) => handleFilterChange('search', e.target.value)}
                type="search"
                label="keyword search"
                value={filters.search}
                fullWidth
                id="fullWidth"
              />
              {/* <Button type="submit">Search</Button> */}
            </form>
          </div>
          {/* Filters Section */}
          <section className={styles.searchNavFilterContainer}>
            <div className="select">
              <select
                name="area-of-study"
                className="dropdown"
                id="area-of-study"
                value={filters.degreeTypes}
                onChange={(e) =>
                  handleFilterChange('degreeTypes', e.target.value)
                }
              >
                <option value="">Degree Type</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div className="select">
              <select
                name="area-of-study"
                id="area-of-study"
                value={filters.areaOfStudy}
                onChange={(e) =>
                  handleFilterChange('areaOfStudy', e.target.value)
                }
              >
                <option value="">Area of Study</option>
                <option value="agriculture-and-natural-resources">
                  Agriculture and Natural Resources
                </option>
                <option value="architecture-and-design">
                  Architecture and Design
                </option>
                <option value="art-and-performance">Art and Performance</option>
                <option value="business">Business</option>
                <option value="communication-and-information-sciences">
                  Communication and Information Sciences
                </option>
                <option value="education">Education</option>
                <option value="engineering-math-and-computers">
                  Engineering, Math and Computers
                </option>
                <option value="english-and-literature">
                  English and Literature
                </option>
                <option value="health-wellness-and-human-sciences">
                  Health, Wellness and Human Sciences
                </option>
                <option value="languages-cultures-and-humanities">
                  Languages, Cultures and Humanities
                </option>
                <option value="law-and-justice">Law and Justice</option>
                <option value="science">Science</option>
                <option value="social-science-and-social-work">
                  Social Science and Social Work
                </option>
                <option value="veterinary">Veterinary</option>
              </select>
            </div>
            <div className="select">
              <select
                name="area-of-study"
                id="area-of-study"
                value={filters.college}
                onChange={(e) => handleFilterChange('college', e.target.value)}
              >
                <option value="">College</option>
                <option value="herbert-college-of-agriculture">
                  Herbert College of Agriculture
                </option>
                <option value="architecture-and-design">
                  Architecture and Design
                </option>
                <option value="arts-and-sciences">Arts and Sciences</option>
                <option value="baker-school-of-public-policy-and-public-affairs">
                  Baker School of Public Policy and Public Affairs
                </option>
                <option value="haslam-college-of-business">
                  Haslam College of Business
                </option>
                <option value="communication-and-information">
                  Communication and Information
                </option>
                <option value="education-health-and-human-sciences">
                  Education, Health and Human Sciences
                </option>
                <option value="emerging-and-collaborative-studies">
                  Emerging and Collaborative Studies
                </option>
                <option value="tickle-college-of-engineering">
                  Tickle College of Engineering
                </option>
                <option value="law">Law</option>
                <option value="music">Music</option>
                <option value="nursing">Nursing</option>
                <option value="social-work">Social Work</option>
                <option value="veterinary-medicine">Veterinary Medicine</option>
              </select>
            </div>
            <FormControlLabel
              className={'switchButtonLabel'}
              control={
                <Switch className={'switchButton'} defaultChecked={false} />
              }
              label="Online"
              labelPlacement="end"
            />
          </section>
        </section>
        {/* Filter Tags */}
        <section className={styles.filtersSection}>
          {filters.search === '' &&
          filters.areaOfStudy === '' &&
          filters.college === '' &&
          filters.degreeTypes === '' ? (
            <></>
          ) : (
            <div>
              <strong>Filters:</strong>
            </div>
          )}
          {/* Show tag buttons for any filters that are set */}
          {filters.search === '' ? (
            <></>
          ) : (
            <div
              className={styles.tagButton}
              onClick={() => handleFilterChange('search', '')}
            >
              <span className={styles.tagButtonTitle}>Search:</span>{' '}
              {filters.search}&nbsp;&nbsp;&nbsp;<strong>X</strong>
            </div>
          )}
          {filters.areaOfStudy === '' ? (
            <></>
          ) : (
            <div
              className={styles.tagButton}
              onClick={() => handleFilterChange('areaOfStudy', '')}
            >
              <span className={styles.tagButtonTitle}>Area of Study:</span>{' '}
              {filters.areaOfStudy.replaceAll('-', ' ')}
              &nbsp;&nbsp;&nbsp;<strong>X</strong>
            </div>
          )}
          {filters.college === '' ? (
            <></>
          ) : (
            <div
              className={styles.tagButton}
              onClick={() => handleFilterChange('college', '')}
            >
              <span className={styles.tagButtonTitle}>College:</span>{' '}
              {filters.college.replaceAll('-', ' ')}
              &nbsp;&nbsp;&nbsp;<strong>X</strong>
            </div>
          )}
          {filters.degreeTypes === '' ? (
            <></>
          ) : (
            <div
              className={styles.tagButton}
              onClick={() => handleFilterChange('degreeTypes', '')}
            >
              <span className={styles.tagButtonTitle}>Degree Type:</span>{' '}
              {filters.degreeTypes}
              &nbsp;&nbsp;&nbsp;<strong>X</strong>
            </div>
          )}
        </section>

        {/* Fake Results for Styling */}
        <section className={styles.resultsSection}>
          <ol className={styles.programGrid}>
            <li className={styles.labelContainer}>
              <div className={styles.programLabel}>Major</div>
              <div className={styles.programLabel}>Degree</div>
              <div className={styles.programLabel}>Concentration</div>
            </li>
            <li className={styles.programEntry}>
              <h2 className={styles.majorName}>Aerospace Engineering</h2>
              <div className={styles.degreeContainer}>Five-year</div>
              <div className={styles.concentrationContainer}>Concentration</div>
            </li>
            <li className={styles.programEntry}>
              <h2 className={styles.majorName}>Aerospace Engineering</h2>
              <div className={styles.degreeContainer}>Five-year</div>
              <div className={styles.concentrationContainer}>
                <ol>
                  <li>Applied Mechanics</li>
                  <li>Nuclear Space Science and Engineering</li>
                  <li>
                    Realiability and Maintainability Engineering{' '}
                    <span className={styles.onlineTag}>Online</span>
                  </li>
                </ol>
              </div>
            </li>
          </ol>
        </section>

        {/* Results Table */}
        <section className={styles.resultsContainer}>
          {activeItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '5px 10px' }}>Major</th>
                  <th style={{ padding: '5px 10px' }}>Concentration</th>
                  <th style={{ padding: '5px 10px' }}>College</th>
                  <th style={{ padding: '5px 10px' }}>Area of Study</th>
                  <th style={{ padding: '5px 10px' }}>Degrees</th>
                  <th style={{ padding: '5px 10px' }}>Online</th>
                  <th style={{ padding: '5px 10px' }}>Program Link</th>
                </tr>
              </thead>
              <tbody>
                {activeItems?.map((this_program, i) => {
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid black' }}>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.major}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.concentration}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.college}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.areaOfStudy}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.degrees}
                      </td>
                      {this_program.degreeTypes.includes('Online') ? (
                        <td
                          style={{ fontSize: 'xx-large', padding: '5px 10px' }}
                        >
                          &#9989;
                        </td>
                      ) : (
                        <td style={{ padding: '5px 10px' }}></td>
                      )}
                      <td style={{ padding: '5px 10px' }}>
                        <a href={this_program.programLink}>link</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3>No matching programs</h3>
          )}
        </section>
        {/* Below is the Table we won't be using */}
        {/* Results Table */}
        <section className={styles.areasContainer}>
          {activeItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '5px 10px' }}>Major</th>
                  <th style={{ padding: '5px 10px' }}>Concentration</th>
                  <th style={{ padding: '5px 10px' }}>College</th>
                  <th style={{ padding: '5px 10px' }}>Area of Study</th>
                  <th style={{ padding: '5px 10px' }}>Degrees</th>
                  <th style={{ padding: '5px 10px' }}>Online</th>
                  <th style={{ padding: '5px 10px' }}>Program Link</th>
                </tr>
              </thead>
              <tbody>
                {activeItems?.map((this_program, i) => {
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid black' }}>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.major}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.concentration}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.college}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.areaOfStudy}
                      </td>
                      <td style={{ padding: '5px 10px' }}>
                        {this_program.degrees}
                      </td>
                      {this_program.degreeTypes.includes('Online') ? (
                        <td
                          style={{ fontSize: 'xx-large', padding: '5px 10px' }}
                        >
                          &#9989;
                        </td>
                      ) : (
                        <td style={{ padding: '5px 10px' }}></td>
                      )}
                      <td style={{ padding: '5px 10px' }}>
                        <a href={this_program.programLink}>link</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3>No matching programs</h3>
          )}
        </section>
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
    }
  }
}
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, { Page: Programs, revalidate: 120 });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
