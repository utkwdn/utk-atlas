import React from 'react';
import styles from 'scss/components/AosPrograms.module.scss';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { GetAosProgramsQuery } from '../__generated__/graphql';
import { useState, useEffect, FormEvent } from 'react';
import { matchSorter } from 'match-sorter';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';

interface FlatProgram {
  title: string;
  college: string;
  degrees: string;
  degreeTypes: string;
  url: string;
}

interface Props {
  aos: string;
}

interface Filters {
  [key: string]: string;
  search: string;
  degreeTypes: string;
}

// const Footer: FaustTemplate<FooterToolsQuery> = (props) => {
function AosPrograms({ aos }: Props): JSX.Element {
  const [programsArray, setProgramsArray] = useState([
    {
      title: '',
      college: '',
      degrees: '',
      degreeTypes: '',
      url: '',
    },
  ]);
  const [filters, setFilters] = useState({
    search: '',
    degreeTypes: '',
  });

  const handleFilterChange = (filterType: string, value: string) => {
    const _filters: Filters = filters;
    _filters[filterType] = value;
    setFilters({ ..._filters });
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleFilterChange('search', filters.search);
  };

  const queryResults = useQuery(AosPrograms.query, {
    variables: { aosName: aos },
  });

  const programsQueryData: GetAosProgramsQuery | undefined = queryResults.data;

  useEffect(() => {
    if (programsQueryData?.areasOfStudy?.nodes[0].programs?.nodes) {
      let flatPrograms =
        programsQueryData?.areasOfStudy?.nodes[0].programs?.nodes?.map(
          (program) => {
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
              title: program.title || '',
              college: program.colleges?.nodes[0].name || '',
              degrees: degreeString,
              degreeTypes: degreeType,
              url: program.programDetailsFields?.url || '',
            };
          }
        );

      // Apply any Search filters
      if (filters.search !== '') {
        flatPrograms = matchSorter(flatPrograms, filters.search, {
          keys: ['title', 'college', 'degrees'],
          threshold: matchSorter.rankings.ACRONYM,
        });
      }
      // Apply any Degree Type filters
      if (filters.degreeTypes !== '') {
        flatPrograms = matchSorter(flatPrograms, filters.degreeTypes, {
          keys: ['degreeTypes'],
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
      }

      setProgramsArray(flatPrograms);
      console.log(programsArray);
    }
  }, [programsQueryData, filters]);

  return (
    <div>
      <section className={styles.searchContainer}>
        Programs of Study in this area
      </section>
      <section className={styles.searchContainer}>
        <form
          onSubmit={(e) => handleSearchSubmit(e)}
          className={styles['alpha-form']}
        >
          <TextField
            onChange={(e) => handleFilterChange('search', e.target.value)}
            type="search"
            label="Find a Program"
            value={filters.search}
            fullWidth
            id="fullWidth"
          />
          <Button type="submit">Search</Button>
        </form>
        <div className={styles.radioButtonSection}>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id=""
              name="degreeType"
              value=""
              checked={filters.degreeTypes === ''}
              onChange={(e) =>
                handleFilterChange('degreeTypes', e.target.value)
              }
            />
            <label htmlFor="undergraduate">All Degrees</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="undergraduate"
              name="degreeType"
              value="undergraduate"
              checked={filters.degreeTypes === 'undergraduate'}
              onChange={(e) =>
                handleFilterChange('degreeTypes', e.target.value)
              }
            />
            <label htmlFor="undergraduate">Undergraduate</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="graduate"
              name="degreeType"
              value="graduate"
              checked={filters.degreeTypes === 'graduate'}
              onChange={(e) =>
                handleFilterChange('degreeTypes', e.target.value)
              }
            />
            <label htmlFor="graduate">Graduate</label>
          </div>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="online"
              name="degreeType"
              value="online"
              checked={filters.degreeTypes === 'online'}
              onChange={(e) =>
                handleFilterChange('degreeTypes', e.target.value)
              }
            />
            <label htmlFor="online">Online</label>
          </div>
        </div>
      </section>

      <section className={styles.programsContainer}>
        {programsArray.length > 0 && programsArray[0].title !== '' ? (
          <div className={styles.programsContainerOuter}>
            <div className={styles.srollInstructions}>
              <span>&lsaquo;</span> <p>Scroll</p>
            </div>
            <div className={styles.programsContainerInner}>
              {programsArray?.map((this_program, i) => {
                return (
                  <div className={styles.programRow} key={i}>
                    <div className={styles.programNameDegree}>
                      <span>{this_program.title}</span>,{' '}
                      <strong>{this_program.degrees}</strong>
                    </div>
                    <div
                      className={styles.programCollege}
                    >{`${this_program.college}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No matching programs</p>
        )}
      </section>
    </div>
  );
}

AosPrograms.query = gql(`
  query GetAosPrograms($aosName: [String]) { 
    areasOfStudy(where: {name: $aosName}) {
      nodes {
        name
        id
        programs(first: 300) {
          nodes {
            title
            colleges {
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
            programDetailsFields {
              url
            }
          }
        }
      }
    }
  }
`);

export default AosPrograms;
