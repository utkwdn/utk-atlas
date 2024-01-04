import Layout from '../../components/Layout';
import styles from 'scss/pages/Programs.module.scss';
import { PageTitle } from 'components';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import Head from 'next/head';

import { gql } from '../../__generated__';
import { useQuery } from '@apollo/client';


function Programs() {
  const { data } = useQuery(Programs.query);
  const programs = data?.programs?.nodes;

  return (
    <Layout>
      <Head>
        <title>Programs</title>
      </Head>
      <PageTitle title={'Programs'} />

      <section className={styles.areasContainer}>
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

            {programs?.map((this_program, i) => {
              const major = this_program.majors?.nodes[0].name || '';
              const concentration = this_program.title || '';
              const college = this_program.colleges?.nodes[0].name || '';
              const areaOfStudy = this_program.areasOfStudy?.nodes[0].name || '';
              const degreesArray = this_program.degrees?.nodes;
              const degreeString = degreesArray?.map(function (e) {return e.name;}).join(', ');
              const hasOnline = degreeString?.includes("Online") ? true : false;
              const programLink = this_program.programDetailsFields?.url || '#';

                return (
                <tr key={i} style={{borderBottom: '1px solid black'}}>
                  <td style={{padding: '5px 10px'}}>{major}</td>
                  <td style={{padding: '5px 10px'}}>{concentration}</td>
                  <td style={{padding: '5px 10px'}}>{college}</td>
                  <td style={{padding: '5px 10px'}}>{areaOfStudy}</td>
                  <td style={{padding: '5px 10px'}}>{degreeString}</td>
                  {hasOnline
                    ? <td style={{fontSize: 'xx-large', padding: '5px 10px'}}>&#9989;</td>
                    : <td style={{padding: '5px 10px'}}></td>
                  }
                  <td style={{padding: '5px 10px'}}><a href={programLink}>link</a></td>
                </tr>
                )
              })}

          </tbody>  
        </table>
        
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
