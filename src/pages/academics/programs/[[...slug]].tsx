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

interface OrganizedPrograms {
  checkKey?: string;
  major: string;
  degrees: string;
  concentration: [{ name: string; link: string; online: boolean }];
}

function Programs() {
  const [activeItems, setActiveItems] = useState([
    {
      major: 'Major',
      degrees: 'Degree',
      concentration: [{ name: 'Program', link: 'Link', online: false }],
    },
  ]);
  const [filters, setFilters] = useState({
    search: '',
    'area-of-study': '',
    college: '',
    'degree-type': '',
    online: '',
  });
  const [selectAreas, setSelectAreas] = useState([{ area: '', slug: '' }]);
  const [selectColleges, setSelectColleges] = useState([
    { college: '', slug: '' },
  ]);
  const [dataUpdated, setDataUpdated] = useState('[date]');
  const filtersRef = useRef<null | HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicSrc, setDynamicSrc] = useState<string>('');

  const scrollToFilters = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView();
      filtersRef.current.focus();
    }
  };

  const { data } = useQuery(Programs.query);
  const programs = data?.programs?.nodes;
  const router = useRouter();

  const alphabetizeByMajor = (a: Program, b: Program) => {
    if (a.major < b.major) {
      return -1;
    }
    if (a.major > b.major) {
      return 1;
    }
    return 0;
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const _filters: Filters = filters;
    if (_filters[filterType] !== value) {
      _filters[filterType] = value;
      setFilters({ ..._filters });

      // updateUrl();
    }
  };

  const handleSelectChange = (filterType: string, value: string) => {
    handleFilterChange(filterType, value);
    updateUrl();
    scrollToFilters();
  };

  const handleSearchChange = (value: string) => {
    handleFilterChange('search', value);
    updateUrl();
  };

  const handleSwitchChange = () => {
    const newSwitchValue = filters.online === '' ? 'true' : '';

    handleFilterChange('online', newSwitchValue);
    updateUrl();
    scrollToFilters();
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleFilterChange('search', filters.search);
    updateUrl();
    scrollToFilters();
  };

  // Update URL as filters and search are adjusted on page
  const updateUrl = () => {
    const _filters = [
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
      {
        type: 'search',
        term: filters.search,
      },
    ];

    let queryString = ``;

    _filters.forEach((filter) => {
      if (filter.term !== '') {
        queryString += `/${filter.type}/${filter.term}`;
      }
    });

    window.history.replaceState('', '', `/academics/programs${queryString}`);
  };

  // Create URL friendly string for URL params and select boxes
  const slugify = (string: string) => {
    return string
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replaceAll(' ', '-');
  };

  // Combine concentrations with matching major / degree pairs and save to state
  const combineConcentrations = (flat: Program[]) => {
    const organizedPrograms: OrganizedPrograms[] = [];

    flat.forEach((program) => {
      const checkKey = slugify(program.major + ' ' + program.degrees);
      const programIndex = organizedPrograms
        .map((e) => e.checkKey)
        .indexOf(checkKey);

      // If major/degree combo doesn't exist yet, add new object
      if (programIndex === -1) {
        organizedPrograms.push({
          checkKey: checkKey,
          major: program.major,
          degrees: program.degrees,
          concentration: [
            {
              name: program.concentration,
              link: program.programLink,
              online: program.degreeTypes.includes('Online') ? true : false,
            },
          ],
        });
        // If major/degree exists, add concentration to array
      } else {
        organizedPrograms[programIndex].concentration.push({
          name: program.concentration,
          link: program.programLink,
          online: program.degreeTypes.includes('Online') ? true : false,
        });
      }
    });
    return organizedPrograms;
  };

  // Controls search navigation Offcanvas
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // Save unique areas and colleges to state to populate select boxes
  const populateSelectBoxes = (flatPrograms: Program[]) => {
    const uniqueSelectAreas = flatPrograms
      .map((program) => program.areaOfStudy)
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((area) => {
        return {
          area: area,
          slug: slugify(area),
        };
      });

    const uniqueSelectColleges = flatPrograms
      .map((program) => program.college)
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((college) => {
        return {
          college: college,
          slug: slugify(college),
        };
      });

    setSelectAreas(uniqueSelectAreas);
    setSelectColleges(uniqueSelectColleges);
  };

  // Look up and return original area / college string using slug
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
    } else if (slug === 'graduate-certificate') {
      return 'Graduate Certificate';
    } else if (slug === 'undergraduate-certificate') {
      return 'Undergraduate Certificate';
    } else if (type === 'degree-type') {
      return slug.charAt(0).toUpperCase() + slug.slice(1);
    } else {
      return slug;
    }
  };

  const setDate = (unformattedDate: string) => {
    const timestamp = new Date(unformattedDate);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[timestamp.getMonth()];
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    setDataUpdated(formattedDate);
  };

  // If one on-ground cencentration is empty string and rest are online, replace empty string with major name
  const formatConcentrations = (
    major: string,
    concentrationArray: { name: string; link: string; online: boolean }[]
  ) => {
    // console.log(concentrationArray);
    const onGroundConcentrations = concentrationArray
      .map((concentration, i) => {
        if (concentration.online === false && concentration.name === '') {
          return i;
        }
      })
      .filter((index) => {
        return typeof index === 'number';
      });
    if (onGroundConcentrations.length > 0 && concentrationArray.length > 1) {
      const concentrationIndex = onGroundConcentrations[0] || 0;
      concentrationArray[concentrationIndex].name = major;
    }
    return concentrationArray;
  };

  const appendDynamicSrc = () => {
    const appendString =
      dynamicSrc && dynamicSrc !== '' ? `?dmc=${dynamicSrc}` : '';
    return appendString;
  };

  useEffect(() => {
    // Convert any URL params into filters
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
    if (programs) {
      setDate(programs[0].date as string);

      // Organize fetched programs data into array of simple objects
      let flatPrograms = programs
        ?.map((program) => {
          const degreeString =
            program.degrees?.nodes
              ?.filter(function (e) {
                return e.name !== 'Online';
              })
              ?.map(function (e) {
                let degreeName = e.name;
                if (e.name === 'C4') {
                  degreeName = `Graduate Certificate`;
                } else if (e.name === 'C3') {
                  degreeName = `Undergraduate Certificate`;
                }
                return degreeName;
              })
              .join('/, ') || '';
          const degreeType =
            program.degrees?.nodes
              ?.map(function (e) {
                return e.description;
              })
              .join(', ') || '';
          let programTitle;
          if (program.title === 'none') {
            programTitle = degreeType.includes('Online')
              ? program.majors?.nodes[0].name
              : '';
          } else {
            programTitle = program.title;
          }

          return {
            major: program.majors?.nodes[0].name || '',
            concentration: programTitle || '',
            college: program.colleges?.nodes[0].name || '',
            collegeSlug: slugify(program.colleges?.nodes[0].name || ''),
            areaOfStudy: program.areasOfStudy?.nodes[0].name || '',
            areaSlugOne: slugify(program.areasOfStudy?.nodes[0].name || ''),
            areaSlugTwo: program.areasOfStudy?.nodes[1]
              ? slugify(program.areasOfStudy?.nodes[1].name || '')
              : '',
            areaSlugThree: program.areasOfStudy?.nodes[2]
              ? slugify(program.areasOfStudy?.nodes[2].name || '')
              : '',
            degrees: degreeString,
            degreeTypes: degreeType,
            programLink: program.programDetailsFields?.url || '#',
          };
        })
        .sort(alphabetizeByMajor);

      // Populate select boxes using fetched data
      populateSelectBoxes(flatPrograms);

      // Apply any Search filters
      if (filters.search !== '') {
        // if search term ends in 's' remove 's'
        // i.e. 'communications' will also return 'communication'
        const searchTerm = filters.search.endsWith('s')
          ? filters.search.slice(0, -1)
          : filters.search;
        flatPrograms = matchSorter(flatPrograms, searchTerm, {
          keys: ['major', 'concentration', 'college', 'areaOfStudy', 'degrees'],
          threshold: matchSorter.rankings.ACRONYM,
        });
      }
      // Apply any Area of Study filters
      if (filters['area-of-study'] !== '') {
        flatPrograms = matchSorter(flatPrograms, filters['area-of-study'], {
          keys: ['areaSlugOne', 'areaSlugTwo', 'areaSlugThree'],
          threshold: matchSorter.rankings.EQUAL,
        });
      }
      // Apply any College filters
      if (filters.college !== '') {
        flatPrograms = matchSorter(flatPrograms, filters.college, {
          keys: ['collegeSlug'],
          threshold: matchSorter.rankings.ACRONYM,
        });
      }
      // Apply any Degree Type filters
      if (filters['degree-type'] !== '') {
        flatPrograms = matchSorter(
          flatPrograms,
          deslugify('degree-type', filters['degree-type']),
          {
            keys: ['degreeTypes'],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
          }
        );
      }
      // Apply online filter if set to true
      if (filters.online === 'true') {
        flatPrograms = matchSorter(flatPrograms, 'Online', {
          keys: ['degreeTypes'],
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
      }

      // console.log(`Total Matches - ${flatPrograms.length}`);

      // Organize by major/degree then update state
      setActiveItems(combineConcentrations(flatPrograms));
      setIsLoading(false);
    }
  }, [programs, filters]);

  useEffect(() => {
    // Check if url param 'dmc' is set and save to dynamicSrc if so
    const searchParams = new URLSearchParams(document.location.search);
    const srcParam = searchParams.get('dmc');
    if (srcParam) {
      setDynamicSrc(srcParam);
    }
  }, []);

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
                <a
                  href={`https://utk.edu/requestinfo${appendDynamicSrc()}`}
                  className="hero-cat"
                >
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
      <section className={styles.areasContainer} id="filters" ref={filtersRef}>
        {/* parent container */}
        {/* Search Section */}
        <section className={styles.searchNavContainer}>
          <div className={styles.programsSearch}>
            <form
              onSubmit={(e) => handleSearchSubmit(e)}
              className={styles['alpha-form']}
            >
              <TextField
                onChange={(e) => handleSearchChange(e.target.value)}
                type="search"
                label="Find a program"
                value={filters.search}
                fullWidth
                id="fullWidth"
                className={styles.utFilterSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className={styles.magnifyingGlass}></span>
                    </InputAdornment>
                  ),
                }}
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
                aria-label="Degree Type"
                value={filters['degree-type']}
                onChange={(e) =>
                  handleSelectChange('degree-type', e.target.value)
                }
              >
                <option value="" aria-label="option">
                  Degree type
                </option>
                <option value="undergraduate" aria-label="option">
                  Undergraduate
                </option>
                <option value="graduate" aria-label="option">
                  Graduate
                </option>
                <option value="graduate-certificate" aria-label="option">
                  Graduate Certificate
                </option>
                <option value="undergraduate-certificate" aria-label="option">
                  Undergraduate Certificate
                </option>
                {/* <option value="online">Online</option> */}
              </select>
            </div>
            <div className="select">
              <select
                name="area-of-study"
                className="dropdown"
                id="area-of-study"
                aria-label="Area of Study"
                value={filters['area-of-study']}
                onChange={(e) =>
                  handleSelectChange('area-of-study', e.target.value)
                }
              >
                <option value="">Area of study</option>
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
                aria-label="College"
                value={filters.college}
                onChange={(e) => handleSelectChange('college', e.target.value)}
              >
                <option value="" aria-label="option">
                  College
                </option>
                {/* Map college options from fetched data */}
                {selectColleges?.map((this_college, i) => {
                  return (
                    <option
                      key={i}
                      value={this_college.slug}
                      aria-label="option"
                    >
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
                  value="online only"
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
                tabIndex={0}
              >
                {/* <span className={styles.tagButtonTitle}>Search:</span>{' '} */}
                {filters.search}
              </div>
            )}
            {filters['area-of-study'] === '' || selectAreas.length === 1 ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('area-of-study', '')}
                tabIndex={0}
              >
                {/* <span className={styles.tagButtonTitle}>Area of Study:</span>{' '} */}
                {deslugify('area-of-study', filters['area-of-study'])}
              </div>
            )}
            {filters.college === '' || selectColleges.length === 1 ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('college', '')}
                tabIndex={0}
              >
                {/* <span className={styles.tagButtonTitle}>College:</span>{' '} */}
                {deslugify('college', filters.college)}
              </div>
            )}
            {filters['degree-type'] === '' ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('degree-type', '')}
                tabIndex={0}
              >
                {/* <span className={styles.tagButtonTitle}>Degree Type:</span>{' '} */}
                {deslugify('degree-type', filters['degree-type'])}
              </div>
            )}
            {filters.online === '' ? (
              <></>
            ) : (
              <div
                className={styles.tagButton}
                onClick={() => handleFilterChange('online', '')}
                tabIndex={0}
              >
                <span className={styles.tagButtonTitle}>Online</span> Online
              </div>
            )}
          </section>{' '}
        </section>

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
                <ol className={styles.programGrid}>
                  <li key={'labelContainer'} className={styles.labelContainer}>
                    <h2 className={styles.programLabel}>Program</h2>
                    <h2 className={styles.programLabel}>
                      Degree / Certificate
                    </h2>
                    <h2 className={styles.programLabel}>
                      Concentration
                      <span className={styles.toolTip} tabIndex={0}>
                        <span className={styles.messageConcentratation}>
                          <p>
                            Some programs may not offer concentrations while
                            others may require them.{' '}
                          </p>
                        </span>
                      </span>
                    </h2>
                  </li>
                  {/* {activeItems?.map((this_item, i) => {
                      return (
                        <> */}
                  {activeItems?.map((this_item, j) => {
                    const degreeNameArray = this_item.degrees.split('/, ');
                    const formattedConcentrations = formatConcentrations(
                      this_item.major,
                      this_item.concentration
                    );
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
                          {formattedConcentrations?.map((this_program, k) => {
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
                  {/* </>
                      );
                    })} */}
                </ol>
              </section>
            ) : (
              <section className={styles.resultsSectionMessage}>
                <h3>No matching programs</h3>
              </section>
            )}
            {/* End Results Container */}
            <section className={styles.disclaimerSection}>
              <p>
                Last updated on {dataUpdated}. To view all current programs,
                visit the{' '}
                <a href="https://catalog.utk.edu/">undergraduate catalog</a> or
                the{' '}
                <a href="https://catalog.utk.edu/index.php?catoid=44">
                  graduate catalog
                </a>
                .
              </p>
            </section>
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
