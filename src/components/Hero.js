import styles from 'scss/components/Hero.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(' ');

const Hero = () => {
  return (
    <>
      {/* <Head></Head> */}

      {/* Update to use gsap node module (https://github.com/greensock/GSAP) */}
      <Script src="./js/gsap.min.js" strategy="beforeInteractive" />
      <Script src="./js/scrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="./js/hero.js" />

      <div className="hero202112Container">
        <div className="hero202112A ">
          <div className="heroHolderA layoutA ">
            <div className="angleBracketDown "></div>
            <div className="heroSquareA ">
              <picture>
                <source
                  srcSet="//images.utk.edu/images/www/hero202203/vols-trio-hero-a1.webp"
                  type="image/webp"
                />
                <source
                  srcSet="//images.utk.edu/images/www/hero202203/vols-trio-hero-a1.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202203/vols-trio-hero-a1.jpg"
                  alt="several smiling students walk together through campus"
                />
              </picture>
            </div>
          </div>

          <div className="heroRainHolderA layoutA ">
            <picture>
              <source
                media="(max-width:767px)"
                srcSet="//images.utk.edu/images/www/hero202112/rain-double-01.svg"
              />
              <source
                media="(min-width:768px)"
                srcSet="//images.utk.edu/images/www/hero202112/rain-single-01.svg"
              />
              <img
                src="//images.utk.edu/images/www/hero202112/rain-double-01.svg"
                alt=""
              />
            </picture>
          </div>

          <div className="heroRectangleHolderA layoutA ">
            <div className="heroRectangleA ">
              <picture>
                <source
                  media="(max-width:767px)"
                  srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
                  type="image/jpeg"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-02.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-02.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
                  alt="students walk through the middle of campus"
                />
              </picture>
            </div>
            {/* end .heroRectangleA*/}
          </div>
          {/* end .heroRectangleHolderA */}

          <div className="dotSquareHolder"></div>

          {/* Begin CTA */}
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
                <a
                  className="btn btn-chevron text-uppercase mb-3 hero-cta"
                  href="https://admissions.utk.edu/visit/"
                >
                  visit campus
                </a>
              </li>
            </ul>
            <p>
              Feel the energy of Big Orange Country and find out more about
              living and learning at the University of Tennessee.
            </p>
            {/*<h3 className="text-uppercase subCta">Accepted to UT?</h3>
          <a href="//admissions.utk.edu/confirm/" className="text-uppercase text-decoration-none accentLink">Confirm Enrollment Now</a> */}
          </div>
          {/* End CTA */}

          <div className="heroRainHolderTripleA layoutA ">
            <picture>
              <source
                media="(min-width:828px)"
                srcSet="//images.utk.edu/images/www/hero202112/rain-triple-01.svg"
              />
              <img
                src="//images.utk.edu/images/www/hero202112/rain-triple-01.svg"
                alt=""
              />
            </picture>
          </div>
          <div className="orangeBarHolderA layoutA ">
            <div className="ginghamChunkA"></div>
            <div className="orangeBarChunkA"></div>
          </div>

          {/* Begin Layout B Items*/}
          <div className="riverAerialHolder layoutB test">
            <div className="riverAerial">
              <picture>
                <source
                  media="(max-width:767px)"
                  srcSet="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.jpg"
                  type="image/jpeg"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="//images.utk.edu/images/www/hero202112/river-aerial-02.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="//images.utk.edu/images/www/hero202112/river-aerial-02.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202112/hero202112/river-aerial-mobile-02.jpg"
                  alt="sunset over the Tennessee River that surrounds campus"
                />
              </picture>
            </div>
            <div className="angleBracketUp"></div>
          </div>

          {/* Begin Layout B Items*/}
          <div className="heroHolderB layoutB">
            <div className="angleBracketDown angleSpaceMatchB softAppearItem"></div>
            <div className="heroSquareB layoutB">
              <picture>
                <source
                  srcSet="//images.utk.edu/images/www/hero202203/student-studying-hero-b2.webp"
                  type="image/webp"
                />
                <source
                  srcSet="//images.utk.edu/images/www/hero202203/student-studying-hero-b2.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202203/student-studying-hero-b1.jpg"
                  alt="smiling student works on a laptop in a public space on campus"
                />
              </picture>
            </div>
          </div>
          <div className="heroRainHolderB layoutB ">
            <img
              src="//images.utk.edu/images/www/hero202112/rain-double-01.svg"
              alt=""
            />
          </div>
          <div className="heroRectangleHolderB layoutB ">
            <div className="heroRectangleB layoutB">
              <picture>
                <source
                  media="(max-width:767px)"
                  srcSet="//images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet="//images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.jpg"
                  type="image/jpeg"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="//images.utk.edu/images/www/hero202203/cheer-students-b1.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="//images.utk.edu/images/www/hero202203/cheer-students-b1.jpg"
                  type="image/jpeg"
                />
                <img
                  src="//images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.jpg"
                  alt="cheerleaders rush the field during a packed home game"
                />
              </picture>
            </div>
            {/* end .heroRectangleB*/}
          </div>
          {/* end .heroRectangleHolderB */}
          <div className="orangeBarHolderB layoutB ">
            <div className="orangeBarChunkB layoutB "></div>
            <div className="ginghamChunkB layoutB"></div>
          </div>
        </div>
        {/* end hero202112A */}
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
