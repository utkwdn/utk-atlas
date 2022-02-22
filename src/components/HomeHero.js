import styles from "scss/components/homeHero.module.scss";

const HomeHero = () => {
  return (
    <div className="hero202112Container">
      <div className="hero202112A ">
        <div className="heroHolderA layoutA ">
          <div className="angleBracketDown "></div>
          <div className="heroSquareA">
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
        <div className="heroRainHolderA layoutA ">
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
        <div className="heroRectangleHolderA layoutA ">
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
              <a
                className="btn btn-chevron text-uppercase mb-3 hero-cta"
                href="https://admissions.utk.edu/visit/"
              >
                explore campus
              </a>
            </li>
          </ul>
          <p>
            Experience the energy of Big Orange country and get to know what it
            means to be a Tennessee Volunteer.
          </p>
        </div>

        <div className="heroRainHolderTripleA layoutA ">
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
        <div className="orangeBarHolderA layoutA ">
          <div className="ginghamChunkA"></div>
          <div className="orangeBarChunkA"></div>
        </div>
        <div className="riverAerialHolder layoutB test">
          <div className="riverAerial">
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
          <div className="angleBracketUp"></div>
        </div>
        <div className="heroHolderB layoutB">
          <div className="angleBracketDown angleSpaceMatchB softAppearItem"></div>
          <div className="heroSquareB layoutB">
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
        <div className="orangeBarHolderB layoutB ">
          <div className="orangeBarChunkB layoutB "></div>
          <div className="ginghamChunkB layoutB"></div>
        </div>
      </div>
    </div>
  );
};
export default HomeHero;
