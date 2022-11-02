import Layout from '../../components/Layout';
import Intro from '../../components/Intro';
import styles from 'scss/pages/Programs.module.scss';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

function Programs() {
  const { useQuery } = client;

  const areasOfStudy =
    useQuery().areasOfStudy({
      first: 1000,
    })?.nodes || [];

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
      {/* CONTENT HOLDER FOR CARDS */}
      <section className={styles.areasContainer}>
        {areasOfStudy?.map((this_area, i) => {
          return (
            <div className={styles.areaCard} key={i}>
              <div className={styles.areaTeaser}>
                <div className={styles.areaTitle}>
                  <h2>
                    {this_area?.name
                      ?.replaceAll(' and', '')
                      ?.split(' ')
                      .map((name_part, i) => (
                        <span key={i}>
                          {name_part}
                          <span className={styles['oa-period']}>.</span>
                          <br />
                        </span>
                      ))}
                  </h2>
                </div>
                {/* End ProgramTitle */}
                <div className={styles.areaImage}>
                  <img
                    src={this_area?.areaStudyFields?.image?.sourceUrl() || ''}
                    alt={this_area?.areaStudyFields?.image?.altText || ''}
                  />
                </div>
                {/* End areaImage */}
                <p>{this_area?.description}</p>
                <a
                  className={[styles.btnTweak, 'btn-link'].join(' ')}
                  href={this_area?.areaStudyFields?.url || '#'}
                >
                  Request Information
                  {}
                </a>
              </div>
              {/* End programTeaser */}
              <div className={styles.programList}>
                <ul>
                  {this_area
                    ?.programs({
                      first: 1000,
                      where: {
                        orderby: [
                          {
                            field: PostObjectsConnectionOrderbyEnum.TITLE,
                            order: OrderEnum.ASC,
                          },
                        ],
                      },
                    })
                    ?.nodes?.map((this_program, i) => (
                      <li key={i}>
                        <a href="#">
                          <span className={styles.programName}>
                            {this_program?.title()}
                            {', '}
                            {
                              this_program
                                ?.majors()
                                ?.nodes?.map((major) => major?.name)[0]
                            }
                          </span>
                        </a>
                        <br />
                        <span className={styles.programCollege}>
                          <span className={styles.programDegrees}>
                            {this_program
                              ?.degrees()
                              ?.nodes?.map((degree) => degree?.name)
                              .join(', ')}
                          </span>
                          {this_program
                            ?.colleges()
                            ?.nodes?.map((college) => college?.name)
                            .join(', ')}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>
      {/* End areasContainer */}
    </Layout>
  );
}

export default Programs;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: Programs,
    client,
  });
}
