import styles from 'scss/components/Hero.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import Script from "next/script";
// need to pull scripts for animation:
// "js/202112-hero-visit-gsap.min.js"
// "js/202112-hero-visit-ScrollTrigger.min.js"
// "js/202112-hero-visit.js"

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(' ');

const Hero = () => {
  return (
    <>
      <Head></Head>

      <div className="hero202112Container">
        <div className="hero202112A "></div>

        <div className="heroHolderA layoutA ">
          <div className="angleBracketDown "></div>
          <div className="heroSquareA ">
            <picture>
              <source
                srcSet="https://images.utk.edu/images/www/hero202203/vols-trio-hero-a1.webp"
                type="image/webp"
              />
              <source
                srcSet="https://images.utk.edu/images/www/hero202203/vols-trio-hero-a1.jpg"
                type="image/jpeg"
              />
              <Image
                src="https://images.utk.edu/images/www/hero202203/vols-trio-hero-a1.jpg"
                alt="several smiling students walk together through campus"
                height="583"
                width="640"
              />
            </picture>
          </div>
        </div>
        <div className="heroRainHolderA layoutA ">
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="https://images.utk.edu/images/www/hero202112/rain-double-01.svg"
            />
            <source
              media="(min-width:768px)"
              srcSet="https://images.utk.edu/images/www/hero202112/rain-single-01.svg"
            />
            <Image
              src="https://images.utk.edu/images/www/hero202112/rain-double-01.svg"
              alt=""
              layout="fill"
            />
          </picture>
        </div>
        <div className="heroRectangleHolderA layoutA ">
          <div className="heroRectangleA ">
            <picture>
              <source
                media="(max-width:767px)"
                srcSet="https://images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.webp"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="https://images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
                type="image/jpeg"
              />
              <source
                media="(min-width:768px)"
                srcSet="https://images.utk.edu/images/www/hero202112/aerial-crosswalk-02.webp"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="https://images.utk.edu/images/www/hero202112/aerial-crosswalk-02.jpg"
                type="image/jpeg"
              />
              <Image
                src="https://images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
                alt="students walk through the middle of campus"
                height="1077"
                width="640"
              />
            </picture>
          </div>
        </div>
        <div className="dotSquareHolder"></div>
        <div className="ctaHolder">
          <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0">
            <span className="text-condensed text-letterspaced fst-italic fs-2">
              Discover
            </span>
            <br />
            Rocky Top
          </h2>
          <ul className="list-unstyled">
            <li>
              <Link href="/visit">
                <a className="btn btn-chevron text-uppercase mb-3 hero-cta">
                  Visit Campus
                </a>
              </Link>
            </li>
          </ul>
          <p>
            Feel the energy of Big Orange Country and find out more about living
            and learning at the University of Tennessee.
          </p>
          <h3 className="text-uppercase subCta">Accepted to UT?</h3>
          <a
            href="//admissions.utk.edu/confirm/"
            className="text-uppercase text-decoration-none accentLink"
          >
            Confirm Enrollment Now
          </a>
        </div>
        <div className="heroRainHolderTripleA layoutA ">
          <picture>
            <source
              media="(min-width:828px)"
              srcSet="https://images.utk.edu/images/www/hero202112/rain-triple-01.svg"
            />
            <Image
              src="https://images.utk.edu/images/www/hero202112/rain-triple-01.svg"
              alt=""
              layout="fill"
            />
          </picture>
        </div>
        <div className="orangeBarHolderA layoutA ">
          <div className="ginghamChunkA"></div>
          <div className="orangeBarChunkA"></div>
        </div>

        <div className="riverAerialHolder layoutB test">
          <div className="riverAerial">
            <picture>
              <source
                media="(max-width:767px)"
                srcSet="https://images.utk.edu/images/www/hero202112/river-aerial-mobile-02.webp"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="https://images.utk.edu/images/www/hero202112/river-aerial-mobile-02.jpg"
                type="image/jpeg"
              />
              <source
                media="(min-width:768px)"
                srcSet="https://images.utk.edu/images/www/hero202112/river-aerial-02.webp"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="https://images.utk.edu/images/www/hero202112/river-aerial-02.jpg"
                type="image/jpeg"
              />
              <Image
                src="https://images.utk.edu/images/www/hero202112/river-aerial-02.jpg"
                alt="sunset over the Tennessee River that surrounds campus"
                height="294"
                width="640"
              />
            </picture>
          </div>
          <div className="angleBracketUp"></div>
        </div>
        <div className="heroHolderB layoutB">
          <div className="angleBracketDown angleSpaceMatchB softAppearItem"></div>
          <div className="heroSquareB layoutB">
            <picture>
              <source
                srcSet="https://images.utk.edu/images/www/hero202203/student-studying-hero-b2.webp"
                type="image/webp"
              />
              <source
                srcSet="https://images.utk.edu/images/www/hero202203/student-studying-hero-b2.jpg"
                type="image/jpeg"
              />
              <Image
                src="https://images.utk.edu/images/www/hero202203/student-studying-hero-b1.jpg"
                alt="smiling student works on a laptop in a public space on campus"
                height="640"
                width="624"
              />
            </picture>
          </div>
        </div>
        <div className="heroRainHolderB layoutB ">
          <Image
            src="https://images.utk.edu/images/www/hero202112/rain-double-01.svg"
            alt=""
            layout="fill"
          />
        </div>
        <div className="heroRectangleHolderB layoutB ">
          <div className="heroRectangleB layoutB">
            <picture>
              <source
                media="(max-width:767px)"
                srcSet="https://images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.webp"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="https://images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.jpg"
                type="image/jpeg"
              />
              <source
                media="(min-width:768px)"
                srcSet="https://images.utk.edu/images/www/hero202203/cheer-students-b1.webp"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="https://images.utk.edu/images/www/hero202203/cheer-students-b1.jpg"
                type="image/jpeg"
              />
              <Image
                src="https://images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.jpg"
                alt="cheerleaders rush the field during a packed home game"
                height="961"
                width="640"
              />
            </picture>
          </div>
        </div>
        <div className="orangeBarHolderB layoutB ">
          <div className="orangeBarChunkB layoutB "></div>
          <div className="ginghamChunkB layoutB"></div>
        </div>
      </div>
      <div className="container">
        <ul className="nav nav-fill internal-links py-4 row">
          <li className="nav-item col-md-4">
            <a className="btn btn-internal" href="#academics">
              Areas of Study
            </a>
          </li>
          <li className="nav-item col-md-4">
            <a className="btn btn-internal" href="#experience">
              Campus Life
            </a>
          </li>
          <li className="nav-item col-md-4">
            <a className="btn btn-internal" href="#value">
              Financial Aid and Scholarships
            </a>
          </li>
        </ul>
      </div>
      {}
    </>
  );
};

export default Hero;
