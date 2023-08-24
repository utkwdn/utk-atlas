import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from 'scss/pages/Vision.module.scss';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/lazy';
import PropTypes from 'prop-types';

const cx = (...classNames) => classNames.join(' ');

function YoutubeEmbed(embedId) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={'https://www.youtube.com/embed/' + embedId}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Play strategic vision video."
    />
  );
}

function Vision() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    console.log(playVideo);
  });

  const { ref: torchCamo01ref, inView: torchCamo01IsVisible } = useInView();
  const { ref: torchCamo02ref, inView: torchCamo02IsVisible } = useInView();
  const { ref: torchCamo03ref, inView: torchCamo03IsVisible } = useInView();
  const { ref: stepsSlideref, inView: stepsSlideIsVisible } = useInView();
  const { ref: objTitleL01ref, inView: objTitleL01IsVisible } = useInView();
  const { ref: objTitleL02ref, inView: objTitleL02IsVisible } = useInView();
  const { ref: objTitleL03ref, inView: objTitleL03IsVisible } = useInView();
  const { ref: objTitleR01ref, inView: objTitleR01IsVisible } = useInView();
  const { ref: objTitleR02ref, inView: objTitleR02IsVisible } = useInView();

  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.titleBlock}>
          <div
            className={[
              styles.angleBracketDown,
              styles.bracketHeroAdjustment,
            ].join(' ')}
          />
          <h1 className={styles.textUppercase}>
            <span className={styles['fake-big-head']}>
              Strategic
              <br />
              Vision
            </span>
            <br />
            <span className={styles.itav}>It takes a Volunteer</span>
          </h1>

          <div className={styles.triangleContainer}>
            <div className={styles.flagshipTorch}></div>
            <div className={styles['triangle-bottomright']}></div>
          </div>
        </div>
        <section className={styles.vision}>
          <h2 className={styles.nod}>Our Vision</h2>
          <p className={styles.lead}>
            A world enriched by our{' '}
            <span className={styles.textPop}>ideas</span>, improved through our{' '}
            <span className={styles.textPop}>action</span>, and inspired by the{' '}
            <span className={styles.textPop}>Volunteer spirit</span> of service
            and leadership
          </p>
          <a
            href="https://content.cms.utk.edu/wp-content/uploads/2022/12/strategic-vision-2021.pdf"
            className={styles.visionLink}
          >
            <span>Read the full Strategic Vision document</span>
            <span className={styles.downloadIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-arrow-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
              </svg>
            </span>
          </a>

          <div className={styles.videoContainer}>
            <div className="container-fluid py-xl-5">
              <div className="row justify-content-center strip-row">
                <div className="col-12 col-sm-12 col-md-12 col-xl-12 align-self-start align-self-md-center item">
                  <div className="ratio ratio-16x9 yt-container max-width-1386">
                    <ReactPlayer
                      url="https://youtu.be/I3H4Po3dFwc"
                      light="https://content.cms.utk.edu/wp-content/uploads/2022/12/video-1080p-thumb-03.jpg"
                      playing
                      controls
                      width="1386"
                      height="780"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={stepsSlideref}
            className={cx(styles.angleContainer, styles.stepsSlide)}
          >
            <p className={styles.angleIntro}>
              We know how much is possible when we unite our individual talents
              and aspirations, put compassion front and center, and
            </p>

            <p
              className={cx(
                styles.textSteps,
                styles.textUppercase,
                styles.stepsSlide,
                `${stepsSlideIsVisible ? styles.stepsAnimate : ''}`
              )}
            >
              <span className={styles.angleCallout}></span>step forward
              <br />
              together as <br /> Volunteers.
            </p>
          </div>
        </section>
        <section className={styles.mission}>
          <h2 className={cx(styles.nod, styles.missionHeader)}>Our Mission</h2>
          <div className={styles.missionCore}>
            <p className={styles.lead}>
              We are a diverse community with a shared commitment to discovery,
              creativity, learning, and engagement.
            </p>
          </div>
          <div className={styles.missionBlock}>
            <ul className={styles.missionList}>
              <p className={styles.cardIntro}>At UT Knoxville we:</p>
              <li>
                <span className={styles.textPopLight}>Empower</span> learners of
                all ages and backgrounds to achieve their dreams through
                accessible and affordable education and state-of-the-art
                research training opportunities
              </li>
              <li>
                <span className={styles.textPopLight}>Advance</span> the
                prosperity, well-being, and vitality of communities across
                Tennessee and around the world through our research, teaching,
                service, and engagement
              </li>
              <li>
                <span className={styles.textPopLight}>Commit</span> to
                excellence, equity, and inclusion within the university, across
                the state, and in all our global activities
              </li>
            </ul>
          </div>
        </section>
      </section>
      <div className={styles.skinnyLongImg}></div>

      <section className={styles.goalsContainer}>
        <h2 className={styles.nod}>
          <span className={styles.printLineHeader}></span>
          <span className={styles.bringForward}>Our Goals and Objectives</span>
        </h2>

        <div className={styles.goalsArticleContainer}>
          <article className={styles.goalsObj}>
            <div className={styles.objLeft}>
              <h3
                ref={objTitleL01ref}
                className={cx(
                  styles.textUppercase,
                  styles.objTitleL01,
                  `${objTitleL01IsVisible ? styles.objTitleAnimate : ''}`
                )}
              >
                Cultivating the{' '}
                <span className={styles.boldPunch}>Volunteer Experience</span>
              </h3>
              <div
                ref={torchCamo01ref}
                className={cx(styles.printLineComplex, styles.camo01Container)}
              >
                <div
                  className={cx(
                    styles.printLinePattern,
                    styles.torchCamo01,
                    `${torchCamo01IsVisible ? styles.torchCamoAnimate : ''}`
                  )}
                ></div>
              </div>
              <p className={cx(styles.lead, styles.offset)}>
                Demonstrate leadership in providing high-quality educational
                opportunities for people at every stage of life, whenever and
                wherever they seek to learn
              </p>
              <ul className={styles.ObjList}>
                <li>
                  <span className={styles.textPopLight}>Provide</span> learners
                  at all levels with opportunities to engage in rich learning
                  and in scholarship that is collaborative, inquiry-based,
                  experiential, affordable, and relevant
                </li>
                <li>
                  <span className={styles.textPopLight}>Deliver</span>{' '}
                  educational opportunities that are responsive to the needs of
                  learners
                </li>
                <li>
                  <span className={styles.textPopLight}>Support</span>{' '}
                  curricular innovations that align with 21st-century workforce
                  needs and our research strengths and priorities
                </li>
                <li>
                  <span className={styles.textPopLight}>Ensure</span> that the
                  programs we offer are accessible to communities across
                  Tennessee and beyond
                </li>
              </ul>
            </div>
          </article>
          <article className={cx(styles.goalsObj, styles.greyBkg)}>
            <div className={styles.objRight}>
              <h3
                className={cx(
                  styles.textUppercase,
                  styles.printLineLeft,
                  styles.objTitleContainerR01
                )}
              >
                <span
                  ref={objTitleR01ref}
                  className={cx(
                    styles.objTitleR01,
                    `${objTitleR01IsVisible ? styles.objTitleAnimateRight : ''}`
                  )}
                >
                  Conducting Research{' '}
                  <span className={styles.boldPunch}>
                    That Makes Life and Lives Better
                  </span>
                </span>
              </h3>
              <p className={cx(styles.lead, styles.offset)}>
                Advance the frontiers of knowledge to create a more just,
                prosperous, and sustainable future through world-class research,
                scholarship, and creative work
              </p>
              <ul className={styles.ObjList}>
                <li>
                  <span className={styles.textPopLight}>Strengthen</span> the
                  impact and reputation of our research, scholarship, and
                  creative activities
                </li>
                <li>
                  <span className={styles.textPopLight}>Ensure</span> that the
                  research outcomes we generate lead to the creation of a more
                  just, prosperous, and sustainable future
                </li>
                <li>
                  <span className={styles.textPopLight}>Invest</span> in
                  state-of-the-art research infrastructure and frameworks to
                  ensure that our researchers, scholars, and creatives continue
                  to work at the knowledge frontier
                </li>
              </ul>
            </div>
          </article>
          <article className={styles.goalsObj}>
            <div className={styles.objLeft}>
              <h3
                ref={objTitleL02ref}
                className={cx(
                  styles.textUppercase,
                  styles.objTitleL02,
                  `${objTitleL02IsVisible ? styles.objTitleAnimate : ''}`
                )}
              >
                Ensuring a Culture Where{' '}
                <span className={styles.boldPunch}>Vol is a Verb</span>
              </h3>
              <div
                ref={torchCamo02ref}
                className={cx(styles.printLineComplex, styles.camo02Container)}
              >
                <div
                  className={cx(
                    styles.printLinePattern,
                    styles.torchCamo02,
                    `${torchCamo02IsVisible ? styles.torchCamoAnimate : ''}`
                  )}
                ></div>
              </div>
              <p className={cx(styles.lead, styles.offset)}>
                Develop and sustain a nurturing university culture where
                diversity and community are enduring sources of strength
              </p>
              <ul className={styles.ObjList}>
                <li>
                  <span className={styles.textPopLight}>Implement</span>{' '}
                  structures and practices that attract and retain a diverse
                  community of faculty, staff, and students and that support a
                  culture where everyone matters and belongs
                </li>
                <li>
                  <span className={styles.textPopLight}>Challenge</span>{' '}
                  students to examine their understandings of the world and
                  their capacity to act as members of an inclusive community
                </li>
                <li>
                  <span className={styles.textPopLight}>Nurture</span> change
                  that supports inclusive behaviors and a culture of respectful
                  dialogue to create greater understanding of difference,
                  starting with our administration, faculty, and staff
                </li>
              </ul>
            </div>
          </article>
          <article className={cx(styles.goalsObj, styles.greyBkg)}>
            <div className={styles.objRight}>
              <h3
                className={cx(
                  styles.textUppercase,
                  styles.objTitleContainerR01,
                  styles.printLineLeft
                )}
              >
                <span
                  ref={objTitleR02ref}
                  className={cx(
                    styles.objTitleR02,
                    `${objTitleR02IsVisible ? styles.objTitleAnimateRight : ''}`
                  )}
                >
                  Making Ourselves{' '}
                  <span className={styles.boldPunch}>Nimble and Adaptable</span>
                </span>
              </h3>
              <p className={cx(styles.lead, styles.offset)}>
                Empower and sustain a culture of collaboration, adaptability,
                and innovation
              </p>
              <ul className={styles.ObjList}>
                <li>
                  <span className={styles.textPopLight}>Enhance</span> a
                  campus-wide culture of innovation and collaboration at all
                  levels
                </li>
                <li>
                  <span className={styles.textPopLight}>Adapt</span> current
                  structures and systems to foster identity and collaboration
                  while supporting innovation
                </li>
                <li>
                  <span className={styles.textPopLight}>Foster</span>{' '}
                  organizational agility and innovation by developing incentives
                  for innovative and transformational work that also breaks or
                  blurs the lines of organizational silos
                </li>
              </ul>
            </div>
          </article>
          <article className={styles.goalsObj}>
            <div className={styles.objLeft}>
              <h3
                ref={objTitleL03ref}
                className={cx(
                  styles.textUppercase,
                  styles.objTitleL03,
                  `${objTitleL03IsVisible ? styles.objTitleAnimate : ''}`
                )}
              >
                Embodying the Modern R1,{' '}
                <span className={styles.boldPunch}>Land-Grant University</span>
              </h3>
              <div
                ref={torchCamo03ref}
                className={cx(styles.printLineComplex, styles.camo03Container)}
              >
                <div
                  className={cx(
                    styles.printLinePattern,
                    styles.torchCamo03,
                    `${torchCamo03IsVisible ? styles.torchCamoAnimate : ''}`
                  )}
                ></div>
              </div>
              <p className={cx(styles.lead, styles.offset)}>
                Connect with every Tennessean and with communities around the
                world, inspiring future Volunteers to join our diverse community
              </p>
              <ul className={styles.ObjList}>
                <li>
                  <span className={styles.textPopLight}>Deepen</span> and extend
                  the university’s ability to connect with Tennesseans
                </li>
                <li>
                  <span className={styles.textPopLight}>Establish</span>, build
                  upon, and streamline processes to identify community needs and
                  activate university resources to meet those needs
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.explore}>
        <div className={styles.angleContainer02}>
          <div className={styles.angleOutro}>
            <p>
              We examined the changing landscape of higher education and
              analyzed the university’s prospects for the future.
            </p>
            <p>
              <a
                href="https://chancellor.utk.edu/vision/envisioning-the-future-of-ut-knoxville/"
                className={styles.exploreLink}
              >
                <span aria-hidden="true">Explore Our Vision Process</span>{' '}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#ff8200"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path>
                  </svg>
                </span>
              </a>
            </p>
          </div>
        </div>
      </section>
      <div className={cx(styles.skinnyLongImg, styles.visionFooter)}></div>
    </Layout>
  );
}

export default Vision;

// // just to get Next.js not to build this page for now
// export async function getStaticProps() {
//   return {
//     notFound: true,
//   };
// }
