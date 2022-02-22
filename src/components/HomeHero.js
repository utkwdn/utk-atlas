import styles from "scss/components/homeHero.module.scss";
import Head from "next/head";
// import Script from "next/script";
// need to pull scripts for animation:
// "js/202112-hero-visit-gsap.min.js"
// "js/202112-hero-visit-ScrollTrigger.min.js"
// "js/202112-hero-visit.js"

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(" ");

// HomeHero is a section added to index.tx

const HomeHero = () => {
  return (
    <>
      <Head>
        <script
          src="js/202112-hero-visit-gsap.min.js"
          strategy="afterInteractive"
        ></script>
        <script
          src="js/202112-hero-visit-ScrollTrigger.min.js"
          strategy="afterInteractive"
        ></script>
        <script
          src="js/202112-hero-visit.js"
          strategy="afterInteractive"
        ></script>
      </Head>
      <div className={styles.hero202112Container}>
        <div className={styles.hero202112A}>
          <div className={cx(styles.heroHolderA, styles.layoutA)}>
            <div className={styles.angleBracketDown}></div>
            <div className={styles.heroSquareA}>
              <picture>
                <source
                  srcset="//images.utk.edu/images/www/hero202112/vols-group-hero-a4.webp"
                  type="image/webp"
                />
                <source
                  srcset="//images.utk.edu/images/www/hero202112/vols-group-hero-a4.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/vols-group-hero-a4.jpg"
                  alt="smiling student stands in front of a group of students gathered on campus"
                />
              </picture>
            </div>
          </div>
          <div className={cx(styles.heroRainHolderA, styles.layoutA)}>
            <picture>
              <source
                media="(max-width:767px)"
                srcset="//images.utk.edu/images/www/hero202112/rain-double-01.svg"
              />
              <source
                media="(min-width:768px)"
                srcset="//images.utk.edu/images/www/hero202112/rain-single-01.svg"
              />
              <img
                src="//images.utk.edu/images/www/hero202112/rain-double-01.svg"
                alt=""
              />
            </picture>
          </div>
          <div className={cx(styles.heroRectangleHolderA, styles.layoutA)}>
            <div className="heroRectangleA ">
              <picture>
                <source
                  media="(max-width:767px)"
                  srcset="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcset="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
                  type="image/jpeg"
                />
                <source
                  media="(min-width:768px)"
                  srcset="//images.utk.edu/images/www/hero202112/aerial-crosswalk-02.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcset="//images.utk.edu/images/www/hero202112/aerial-crosswalk-02.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
                  alt="students walk through the middle of campus"
                />
              </picture>
            </div>
          </div>
          <div className={styles.dotSquareHolder}></div>
          <div className={styles.ctaHolder}>
            <h2
              className={cx(
                styles.textUppercase,
                styles.display3,
                styles.mtMd3,
                styles.mtLg0
              )}
            >
              <span
                className={cx(
                  styles.textCondensed,
                  styles.textLetterspaced,
                  styles.fstItalic,
                  styles.fs2
                )}
              >
                Discover
              </span>
              <br />
              Rocky Top
            </h2>
            <ul className={styles.listUnstyled}>
              <li>
                <a
                  className={cx(
                    styles.btn,
                    styles.btnChevron,
                    styles.textUppercase,
                    styles.mb3,
                    styles.heroCta
                  )}
                  href="https://admissions.utk.edu/visit/"
                >
                  explore campus
                </a>
              </li>
            </ul>
            <p>
              Experience the energy of Big Orange country and get to know what
              it means to be a Tennessee Volunteer.
            </p>
          </div>

          <div className={cx(styles.heroRainHolderTripleA, styles.layoutA)}>
            <picture>
              <source
                media="(min-width:828px)"
                srcset="//images.utk.edu/images/www/hero202112/rain-triple-01.svg"
              />
              <img
                src="//images.utk.edu/images/www/hero202112/rain-triple-01.svg"
                alt=""
              />
            </picture>
          </div>
          <div className={cx(styles.orangeBarHolderA, styles.layoutA)}>
            <div className={styles.ginghamChunkA}></div>
            <div className={styles.orangeBarChunkA}></div>
          </div>
          <div
            className={cx(
              styles.riverAerialHolder,
              styles.layoutB,
              styles.test
            )}
          >
            <div className={styles.riverAerial}>
              <picture>
                <source
                  media="(max-width:767px)"
                  srcset="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcset="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.jpg"
                  type="image/jpeg"
                />
                <source
                  media="(min-width:768px)"
                  srcset="//images.utk.edu/images/www/hero202112/river-aerial-02.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcset="//images.utk.edu/images/www/hero202112/river-aerial-02.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/hero202112/river-aerial-mobile-02.jpg"
                  alt="sunset over the Tennessee River that surrounds campus"
                />
              </picture>
            </div>
            <div className={styles.angleBracketUp}></div>
          </div>
          <div className={cx(styles.heroHolderB, styles.layoutB)}>
            <div
              className={cx(
                styles.angleBracketDown,
                styles.angleSpaceMatchB,
                styles.softAppearItem
              )}
            ></div>
            <div className={cx(styles.heroSquareB, styles.layoutB)}>
              <picture>
                <source
                  srcset="//images.utk.edu/images/www/hero202112/student-working-hero-b.webp"
                  type="image/webp"
                />
                <source
                  srcset="//images.utk.edu/images/www/hero202112/student-working-hero-b.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/student-working-hero-b.jpg"
                  alt="student works in an engineering lab"
                />
              </picture>
            </div>
          </div>
          <div className={cx(styles.heroRainHolderB, styles.layoutB)}>
            <img
              src="//images.utk.edu/images/www/hero202112/rain-double-01.svg"
              alt=""
            />
          </div>
          <div className={cx(styles.heroRectangleHolderB, styles.layoutB)}>
            <div className={cx(styles.heroRectangleB, styles.layoutB)}>
              <picture>
                <source
                  media="(max-width:767px)"
                  srcset="//images.utk.edu/images/www/hero202112/bench-students-mobile-02.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcset="//images.utk.edu/images/www/hero202112/bench-students-mobile-02.jpg"
                  type="image/jpeg"
                />
                <source
                  media="(min-width:768px)"
                  srcset="//images.utk.edu/images/www/hero202112/bench-students-02.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcset="//images.utk.edu/images/www/hero202112/bench-students-02.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/bench-students-mobile-02.jpg"
                  alt="students sit on a bench in the middle of campus"
                />
              </picture>
            </div>
          </div>
          <div className={cx(styles.orangeBarHolderB, styles.layoutB)}>
            <div className={cx(styles.orangeBarChunkB, styles.layoutB)}></div>
            <div className={cx(styles.ginghamChunkB, styles.layoutB)}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
