import Layout from '../../../components/Layout';
import styles from 'scss/pages/Programs.module.scss';
import { PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  useEffect,
  useState,
} from 'react';

import { gql } from '../../../__generated__';
import { useQuery } from '@apollo/client';
import { matchSorter } from 'match-sorter';

interface Program {
  major: string
  concentration: string
  college: string
  'area-of-study': string
  degrees: string
  'degree-types': string
  programLink: string
}

function Programs() {
  const [activeItems, setActiveItems] = useState(
    [
      {
        major: '',
        concentration: '',
        college: '',
        'area-of-study': '',
        degrees: '',
        'degree-types': '',
        programLink: '#'
      }
    ]
  );
  const [filterType, setFilterType] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

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
  }

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

  const handleFilterChange = (chosenFilterType: string, value: string) => {
    if(filterType !== chosenFilterType) {
      setFilterType(chosenFilterType);
    }
    
    if(filterTerm !== value) {
      setFilterTerm(value);
    }
  }


  useEffect(() => {
    if(programs) {
      const flatPrograms = programs?.map((program) => {
        const degreeString = program.degrees?.nodes?.map(function (e) {return e.name;}).join(', ') || '';
        const degreeType = program.degrees?.nodes?.map(function (e) {return e.description;}).join(', ') || '';

        return (
          {
            major: program.majors?.nodes[0].name || '',
            concentration: program.title || '',
            college: program.colleges?.nodes[0].name || '',
            'area-of-study': program.areasOfStudy?.nodes[0].name || '',
            degrees: degreeString,
            'degree-types': degreeType,
            programLink: program.programDetailsFields?.url || '#'
          }
        )
      }).sort(alphabetizeByMajor);

      if(filterType !== '' && filterTerm !== '') {
        if(filterType === 'degree-types') {
          
          const results = matchSorter(flatPrograms, filterTerm, {
            keys: [filterType],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
          });
                
          setActiveItems(results);
          
        } else {
          const noHyphenTerm = filterTerm.replaceAll('-',' ');
          const results = matchSorter(flatPrograms, noHyphenTerm, {
            keys: [filterType],
            threshold: matchSorter.rankings.ACRONYM,
          });
                
          setActiveItems(results);
        }
        
      } else {
        setActiveItems(flatPrograms);
      }
     
    }
  }, [programs, filterTerm]);
  

  return (
    <Layout>
      <Head>
        <title>Programs</title>
      </Head>
      <PageTitle title={'Programs'} />

      <section  className={styles.areasContainer}>
        <div>
          <p><strong>Area of Study</strong></p>
          <select name="area-of-study" id="area-of-study" value={filterType === 'area-of-study' ? filterTerm : ''} onChange={e => handleFilterChange('area-of-study', e.target.value)}>
            <option value="">All Areas of Study</option>
            <option value="agriculture-and-natural-resources">Agriculture and Natural Resources</option>
            <option value="architecture-and-design">Architecture and Design</option>
            <option value="art-and-performance">Art and Performance</option>
            <option value="business">Business</option>
            <option value="communication-and-information-sciences">Communication and Information Sciences</option>
            <option value="education">Education</option>
            <option value="engineering-math-and-computers">Engineering, Math and Computers</option>
            <option value="english-and-literature">English and Literature</option>
            <option value="health-wellness-and-human-sciences">Health, Wellness and Human Sciences</option>
            <option value="languages-cultures-and-humanities">Languages, Cultures and Humanities</option>
            <option value="law-and-justice">Law and Justice</option>
            <option value="science">Science</option>
            <option value="social-science-and-social-work">Social Science and Social Work</option>
            <option value="veterinary">Veterinary</option>
          </select>
        </div>
        <div>
          <p><strong>College</strong></p>
          <select name="area-of-study" id="area-of-study" value={filterType === 'college' ? filterTerm : ''} onChange={e => handleFilterChange('college', e.target.value)}>
            <option value="">All Colleges</option>
            <option value="herbert-college-of-agriculture">Herbert College of Agriculture</option>
            <option value="architecture-and-design">Architecture and Design</option>
            <option value="arts-and-sciences">Arts and Sciences</option>
            <option value="baker-school-of-public-policy-and-public-affairs">Baker School of Public Policy and Public Affairs</option>
            <option value="haslam-college-of-business">Haslam College of Business</option>
            <option value="communication-and-information">Communication and Information</option>
            <option value="education-health-and-human-sciences">Education, Health and Human Sciences</option>
            <option value="emerging-and-collaborative-studies">Emerging and Collaborative Studies</option>
            <option value="tickle-college-of-engineering">Tickle College of Engineering</option>
            <option value="law">Law</option>
            <option value="music">Music</option>
            <option value="nursing">Nursing</option>
            <option value="social-work">Social Work</option>
            <option value="veterinary-medicine">Veterinary Medicine</option>


          </select>
        </div>
        <div>
          <p><strong>Degree Type</strong></p>
          <select name="area-of-study" id="area-of-study" value={filterType === 'degree-types' ? filterTerm : ''} onChange={e => handleFilterChange('degree-types', e.target.value)}>
            <option value="">All Degree Types</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate</option>
            <option value="online">Online</option>
          </select>
        </div>
      </section>

      <section className={styles.areasContainer}>
        {activeItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{padding: '5px 10px'}}>Major</th>
                  <th style={{padding: '5px 10px'}}>Concentration</th>
                  <th style={{padding: '5px 10px'}}>College</th>
                  <th style={{padding: '5px 10px'}}>Area of Study</th>
                  <th style={{padding: '5px 10px'}}>Degrees</th>
                  <th style={{padding: '5px 10px'}}>Online</th>
                  <th style={{padding: '5px 10px'}}>Program Link</th>
                </tr>
              </thead>
              <tbody>
                {activeItems?.map((this_program, i) => {
                    return (
                    <tr key={i} style={{borderBottom: '1px solid black'}}>
                      <td style={{padding: '5px 10px'}}>{this_program.major}</td>
                      <td style={{padding: '5px 10px'}}>{this_program.concentration}</td>
                      <td style={{padding: '5px 10px'}}>{this_program.college}</td>
                      <td style={{padding: '5px 10px'}}>{this_program['area-of-study']}</td>
                      <td style={{padding: '5px 10px'}}>{this_program.degrees}</td>
                      {this_program['degree-types'].includes('Online')
                        ? <td style={{fontSize: 'xx-large', padding: '5px 10px'}}>&#9989;</td>
                        : <td style={{padding: '5px 10px'}}></td>
                      }
                      <td style={{padding: '5px 10px'}}><a href={this_program.programLink}>link</a></td>
                    </tr>
                    )
                  })}
    
              </tbody>  
            </table>
          ) : (
            <h3>No matching programs</h3>
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
