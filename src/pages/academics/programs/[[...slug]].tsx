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
  online: boolean
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
        online: false,
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

  const router = useRouter();  


  if(router.query.slug && router.query.slug.length > 1) {
    const newFilterType = router.query.slug[0];
    const newFilterTerm = router.query.slug[1].replaceAll('-',' ');

    console.log(newFilterTerm)

    if(filterType !== newFilterType) {
      setFilterType(newFilterType);
    }
    
    if(filterTerm !== newFilterTerm) {
      setFilterTerm(newFilterTerm);
    }
  }


  useEffect(() => {
    if(programs) {
      const flatPrograms = programs?.map((program) => {
        const degreeString = program.degrees?.nodes?.map(function (e) {return e.name;}).join(', ') || '';
        const hasOnline = degreeString?.includes("Online") ? true : false;

        return (
          {
            major: program.majors?.nodes[0].name || '',
            concentration: program.title || '',
            college: program.colleges?.nodes[0].name || '',
            'area-of-study': program.areasOfStudy?.nodes[0].name || '',
            degrees: degreeString,
            online: hasOnline,
            programLink: program.programDetailsFields?.url || '#'
          }
        )
      }).sort(alphabetizeByMajor);

      if(filterType !== '' && filterTerm !== '') {
        const results = matchSorter(flatPrograms, filterTerm, {
          keys: [filterType],
          threshold: matchSorter.rankings.ACRONYM,
        });
              
        setActiveItems(results);
      } else {
        setActiveItems(flatPrograms);
      }
     
    }
  }, [programs]);
  

  return (
    <Layout>
      <Head>
        <title>Programs</title>
      </Head>
      <PageTitle title={'Programs'} />

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
                      {this_program.online
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
