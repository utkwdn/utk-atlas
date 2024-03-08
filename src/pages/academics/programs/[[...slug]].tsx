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
import Offcanvas from 'react-bootstrap/Offcanvas';

interface Program {
  major: string;
  concentration: string;
  college: string;
  areaOfStudy: string;
  degrees: string;
  degreeTypes: string;
  programLink: string;
}
[];

interface Filters {
  [key: string]: string;
  search: string;
  'area-of-study': string;
  college: string;
  'degree-type': string;
  online: string;
}

interface MajorArrayIndexes {
  major: { [key: string]: number };
  degree: { [key: string]: number };
  program: { [key: string]: number };
}

interface MajorArray {
  major: string;
  degrees: [
    {
      name: string;
      programs: [{ name: string; link: string; online: boolean }];
    }
  ];
}

interface MajorObject {
  [key: string]: {
    [key: string]: string[];
  };
}

function Programs() {
  const [activeItems, setActiveItems] = useState([
    {
      major: 'Major',
      degrees: [
        {
          name: 'Degree',
          programs: [{ name: 'Program', link: 'Link', online: false }],
        },
      ],
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    'area-of-study': '',
    college: '',
    'degree-type': '',
    online: '',
  });
  // const [searchFilter, setSearchFilter] = useState('');
  // const [aosFilter, setAosFilter] = useState('');
  // const [collegeFilter, setCollegeFilter] = useState('');
  // const [degreeTypeFilter, setDegreeTypeFilter] = useState('');
  // const [onlineFilter, setOnlineFilter] = useState('');

  const [selectAreas, setSelectAreas] = useState([{ area: '', slug: '' }]);
  // const [areasMap, setAreasMap] = useState({});
  const [selectColleges, setSelectColleges] = useState([
    { college: '', slug: '' },
  ]);
  // const [collegesMap, setCollegesMap] = useState({});
  // const [selectsPopulated, setSelectPopulated] = useState(false);

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

  const router = useRouter();

  const handleFilterChange = (filterType: string, value: string) => {
    const _filters: Filters = filters;
    if (_filters[filterType] !== value) {
      _filters[filterType] = value;
      setFilters({ ..._filters });
    }

    pushRouter(filterType, value);
  };

  const pushRouter = (filterType: string, value: string) => {
    const _filters = [
      {
        type: 'search',
        term: filters.search,
      },
      {
        type: 'area-of-study',
        term: filters['area-of-study'],
      },
      {
        type: 'college',
        term: filters.college,
      },
      {
        type: 'degree-type',
        term: filters['degree-type'],
      },
      {
        type: 'online',
        term: filters.online,
      },
    ];

    let queryString = ``;

    _filters.forEach((filter) => {
      if (filter.term !== '') {
        queryString += `${filter.type}/${filter.term}/`;
      }
    });

    window.history.replaceState('', '', `/academics/programs/${queryString}`);
  };

  const handleSwitchChange = () => {
    const newSwitchValue = filters.online === '' ? 'true' : '';

    handleFilterChange('online', newSwitchValue);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('search submit');

    // // handleFilterChange('search', filters.search);
    // pushRouter('search', filters.search);
  };

  const organizeByMajor = (flat: Program[]) => {
    // Keep track of indexes to know where to place new items in majorArray
    const majorArrayIndexes: MajorArrayIndexes = {
      major: {},
      degree: {},
      program: {},
    };

    const allColleges: string[] = [];
    const allAreas: string[] = [];

    const majorArray: MajorArray[] = [];

    const majorObject: MajorObject = {};

    flat.forEach((program) => {
      // Add college if not added yet
      if (!allColleges.includes(program.college)) {
        allColleges.push(program.college);
      }
      // Add area of study if not added yet
      if (!allAreas.includes(program.areaOfStudy)) {
        allAreas.push(program.areaOfStudy);
      }
      // If major hasn't been added yet
      if (!(program.major in majorObject)) {
        // Add to object to check against following programs
        majorObject[program.major] = {};
        majorObject[program.major][program.degrees] = [program.concentration];

        // Add to array for outputting
        majorArray.push({
          major: program.major,
          degrees: [
            {
              name: program.degrees,
              programs: [
                {
                  name: program.concentration,
                  link: program.programLink,
                  online: program.degreeTypes.includes('Online') ? true : false,
                },
              ],
            },
          ],
        });
        // Add array index for major, degree and program
        const degreesIndex = `${program.major} - ${program.degrees}`;
        const concentrationIndex = `${program.major} - ${program.degrees} - ${program.concentration}`;
        majorArrayIndexes.major[program.major] =
          Object.keys(majorObject).length - 1;
        majorArrayIndexes.degree[degreesIndex] =
          Object.keys(majorObject[program.major]).length - 1;
        majorArrayIndexes.program[concentrationIndex] =
          Object.keys(majorObject[program.major][program.degrees]).length - 1;

        // If major has been added but degree hasn't
      } else if (!(program.degrees in majorObject[program.major])) {
        // Add to object to check against following programs
        majorObject[program.major][program.degrees] = [program.concentration];
        // Add to array for outputting
        const majorIndex = majorArrayIndexes.major[program.major];
        majorArray[majorIndex].degrees.push({
          name: program.degrees,
          programs: [
            {
              name: program.concentration,
              link: program.programLink,
              online: program.degreeTypes.includes('Online') ? true : false,
            },
          ],
        });

        // Add array index for degree within major
        const degreesIndex = `${program.major} - ${program.degrees}`;
        majorArrayIndexes.degree[degreesIndex] =
          Object.keys(majorObject[program.major]).length - 1;

        // If major and degree have been added, but concentration has not
      } else if (
        !majorObject[program.major][program.degrees].includes(
          program.concentration
        )
      ) {
        // Add to object to check against following programs
        majorObject[program.major][program.degrees].push(program.concentration);
        // Add to array for outputting
        const majorIndex = majorArrayIndexes.major[program.major];
        const degreeIndex =
          majorArrayIndexes.degree[`${program.major} - ${program.degrees}`];
        majorArray[majorIndex].degrees[degreeIndex].programs.push({
          name: program.concentration,
          link: program.programLink,
          online: program.degreeTypes.includes('Online') ? true : false,
        });
      }
    });

    return majorArray;
  };

  // Controls search navigation Offcanvas

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const populateSelectBoxes = (flatPrograms: Program[]) => {
    const uniqueSelectAreas = flatPrograms
      .map((program) => program.areaOfStudy)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((area) => {
        const areaSlug = area
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replaceAll(' ', '-');
        return {
          area: area,
          slug: areaSlug,
        };
      });

    const uniqueSelectColleges = flatPrograms
      .map((program) => program.college)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((college) => {
        const collegeSlug = college
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replaceAll(' ', '-');
        return {
          college: college,
          slug: collegeSlug,
        };
      });

    setSelectAreas(uniqueSelectAreas);
    setSelectColleges(uniqueSelectColleges);
  };

  const deslugify = (type: string, slug: string) => {
    if (type === 'area-of-study') {
      const deslugged = selectAreas
        .filter((this_area) => {
          return this_area.slug === slug;
        })
        .map((matchingArea) => {
          return matchingArea.area;
        })[0];
      return deslugged;
    } else if (type === 'college') {
      const deslugged = selectColleges
        .filter((this_area) => {
          return this_area.slug === slug;
        })
        .map((matchingArea) => {
          return matchingArea.college;
        })[0];
      return deslugged;
    } else {
      return slug;
    }
  };

  useEffect(() => {
    if (router.query.slug && router.query.slug.length > 1) {
      for (let i = 0; i < router.query.slug.length; i += 2) {
        const chunk = router.query.slug.slice(i, i + 2);
        if (chunk.length === 2) {
          handleFilterChange(chunk[0], chunk[1]);
        }
      }
    }
  }, []);

  useEffect(() => {
    // console.log(filters);
    // if (
    //   router.query.slug &&
    //   router.query.slug.length > 1
    //   // routerQueryOverride === false
    // ) {
    // console.log(router.query);
    // const newFilterType = router.query.slug[0];
    // const newFilterTerm = router.query.slug[1];

    // // Only allowing URL search queries for now
    // if (newFilterType === 'search') {
    //   handleFilterChange('search', newFilterTerm);
    // }
    // }
    // if (router.query) {
    //   handleRouterFilters(router.query);
    //   // console.log(router.query);
    // }

    if (programs) {
      let flatPrograms = programs
        ?.map((program) => {
          const degreeString =
            program.degrees?.nodes
              ?.filter(function (e) {
                return e.name !== 'Online';
              })
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

          const programTitle =
            program.title === 'none' ? 'General' : program.title;

          return {
            major: program.majors?.nodes[0].name || '',
            concentration: programTitle || '',
            college: program.colleges?.nodes[0].name || '',
            areaOfStudy: program.areasOfStudy?.nodes[0].name || '',
            degrees: degreeString,
            degreeTypes: degreeType,
            programLink: program.programDetailsFields?.url || '#',
          };
        })
        .sort(alphabetizeByMajor);

      populateSelectBoxes(flatPrograms);

      // console.log(filters);

      // Apply any Search filters
      if (filters.search !== '') {
        flatPrograms = matchSorter(flatPrograms, filters.search, {
          keys: ['major', 'concentration', 'college', 'areaOfStudy', 'degrees'],
          threshold: matchSorter.rankings.ACRONYM,
        });
      }
      // Apply any Area of Study filters
      if (filters['area-of-study'] !== '') {
        flatPrograms = matchSorter(
          flatPrograms,
          deslugify('area-of-study', filters['area-of-study']),
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
          deslugify('college', filters.college),
          {
            keys: ['college'],
            threshold: matchSorter.rankings.ACRONYM,
          }
        );
      }
      // Apply any Degree Type filters
      if (filters['degree-type'] !== '') {
        flatPrograms = matchSorter(flatPrograms, filters['degree-type'], {
          keys: ['degreeTypes'],
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
      }
      // Apply online filter if set to true
      if (filters.online === 'true') {
        flatPrograms = matchSorter(flatPrograms, 'Online', {
          keys: ['degreeTypes'],
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
      }

      console.log(`Total Matches - ${flatPrograms.length}`);

      // Organize into major/degree/concentration hierarchy then update state
      setActiveItems(organizeByMajor(flatPrograms));
    }
  }, [programs, filters]);
  return (
    <Layout>
      <Head>
        <title>Programs</title>
      </Head>
      {/* <PageTitle title={'Programs'} /> */}

      <Intro
        title={'Programs'}
        theme={'Find your future degree'}
        intro={
          <div>
            <p>
              With 900+ undergraduate, graduate, and PhD programs at UT, you can
              study what you love and be prepared for whatever awaits you after
              graduation.{' '}
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
          {/* <Button className="d-lg-none" onClick={handleShow}>
            Filter
          </Button>
          <Offcanvas show={show} onHide={handleClose} responsive="md">
            <Offcanvas.Header closeButton></Offcanvas.Header> */}
          <section className={styles.searchNavFilterContainer}>
            <div className="select">
              <select
                name="degree-types"
                className="dropdown"
                id="degree-types"
                value={filters['degree-type']}
                onChange={(e) =>
                  handleFilterChange('degree-type', e.target.value)
                }
              >
                <option value="">Degree Type</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                {/* <option value="online">Online</option> */}
              </select>
            </div>
            <div className="select">
              <select
                name="area-of-study"
                className="dropdown"
                id="area-of-study"
                value={filters['area-of-study']}
                onChange={(e) =>
                  handleFilterChange('area-of-study', e.target.value)
                }
              >
                <option value="">Area of Study</option>
                {/* Map AOS options from fetched data */}
                {selectAreas?.map((this_area, i) => {
                  return (
                    <option key={i} value={this_area.slug}>
                      {this_area.area}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select">
              <select
                name="college"
                className="dropdown"
                id="college"
                value={filters.college}
                onChange={(e) => handleFilterChange('college', e.target.value)}
              >
                <option value="">College</option>
                {/* Map college options from fetched data */}
                {selectColleges?.map((this_college, i) => {
                  return (
                    <option key={i} value={this_college.slug}>
                      {this_college.college}
                    </option>
                  );
                })}
              </select>
            </div>
            <FormControlLabel
              className={'switchButtonLabel'}
              control={
                <Switch
                  checked={filters.online === 'true'}
                  onChange={() => handleSwitchChange()}
                  className={'switchButton'}
                />
              }
              label="Online"
              labelPlacement="end"
            />
          </section>
          {/* END OF THE MODAL */}
          {/* </Offcanvas> */}
          {/* Filter Tags */}
          <section className={styles.filtersSection}>
            {filters.search === '' &&
            filters['area-of-study'] === '' &&
            filters.college === '' &&
            filters['degree-type'] === '' &&
            filters.online === '' ? (
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
                {filters.search}
              </div>
            )}
            {filters['area-of-study'] === '' ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('area-of-study', '')}
              >
                <span className={styles.tagButtonTitle}>Area of Study:</span>{' '}
                {deslugify('area-of-study', filters['area-of-study'])}
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
                {deslugify('college', filters.college)}
              </div>
            )}
            {filters['degree-type'] === '' ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('degree-type', '')}
              >
                <span className={styles.tagButtonTitle}>Degree Type:</span>{' '}
                {filters['degree-type']}
              </div>
            )}
            {filters.online === '' ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('online', '')}
              >
                <span className={styles.tagButtonTitle}>Online</span> Online
              </div>
            )}
          </section>{' '}
        </section>

        {/* Results Container */}
        {activeItems.length > 0 ? (
          <section className={styles.resultsSection}>
            <ol className={styles.programGrid}>
              <li key={'labelContainer'} className={styles.labelContainer}>
                <div className={styles.programLabel}>Major</div>
                <div className={styles.programLabel}>Degree</div>
                <div className={styles.programLabel}>Concentration</div>
              </li>
              {activeItems?.map((this_item, i) => {
                return (
                  <>
                    {this_item.degrees?.map((this_degree, j) => {
                      const degreeNameArray = this_degree.name.split(', ');
                      return (
                        <li key={j} className={styles.programEntry}>
                          <h3 className={styles.programName}>
                            {this_item.major}
                          </h3>
                          <ol className={styles.degreeList}>
                            {degreeNameArray?.map((this_degree_name, l) => {
                              return <li key={l}>{this_degree_name}</li>;
                            })}
                          </ol>
                          <ol className={styles.concentrationList}>
                            {this_degree.programs?.map((this_program, k) => {
                              if (this_program.online === true) {
                                return (
                                  <li key={k}>
                                    {this_program.name}{' '}
                                    <span className={styles.onlineTag}>
                                      {/* <a
                                        // href={this_program.link}
                                        href="https://volsonline.utk.edu/programs-degrees/"
                                      > */}
                                      Online
                                      {/* </a> */}
                                    </span>
                                  </li>
                                );
                              } else {
                                return <li key={k}>{this_program.name}</li>;
                              }
                            })}
                          </ol>
                        </li>
                      );
                    })}
                  </>
                );
              })}
            </ol>
          </section>
        ) : (
          <section className={styles.resultsSectionMessage}>
            <h3>No matching programs</h3>
          </section>
        )}
        {/* End Results Container */}
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
