import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import SlateFormEmbed from './SlateFormEmbed';
import Modal from 'react-bootstrap/Modal';
import style from 'scss/components/HeroCTA.module.scss';

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(' ');

const Hero = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dynamicSrc, setDynamicSrc] = useState('');

  const appendDynamicSrc = (linkAddress) => {
    const isInternal =
      linkAddress &&
      (linkAddress.startsWith('https://www.utk.edu') ||
        linkAddress.startsWith('https://utk.edu') ||
        linkAddress.startsWith('/'));
    const dynamicSrcIsSet = typeof dynamicSrc === 'string' && dynamicSrc !== '';

    if (isInternal && dynamicSrcIsSet) {
      return linkAddress + `?dmc=${dynamicSrc}`;
    } else {
      return linkAddress;
    }
  };

  useEffect(() => {
    // Check if url param 'dmc' is set and save to dynamicSrc if so
    const searchParams = new URLSearchParams(document.location.search);
    const srcParam = searchParams.get('dmc');
    if (srcParam) {
      setDynamicSrc(srcParam);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.saveStyles('.hero202112Container, .layoutB'); // stores the css information before in-line styles from animation are put in place

    const heroAnimation = ScrollTrigger.matchMedia({
      // desktop
      '(min-width: 768px)': function () {
        /*––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        Pinning Section – .pointer-events: none; // must be added to the container in css, otherwise it won't scroll!!
        ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/
        gsap.to('.hero202112Container', {
          scrollTrigger: {
            trigger: '.hero202112A',
            start: 'top top',
            scrub: true,
            end: () =>
              `+=${document.querySelector('.hero202112A').offsetHeight}`,
            pin: true,
          },
        });

        /*––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        Timeline for hero image animations
        ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/

        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero202112A',
            start: 'top top',
            scrub: true,
            toggleActions: 'start pause reverse pause',
          },
        });

        tl.addLabel('layoutA', 0);
        tl.addLabel('layoutB', 0.2);

        tl.to(
          '.heroHolderA',
          {
            y: -500,
            duration: 2,
            opacity: 0,
          },
          'layoutA'
        );

        tl.from(
          '.heroHolderB',
          {
            y: '240%',
            duration: 2,
          },
          'layoutB'
        );

        tl.to(
          '.heroRainHolderA',
          {
            y: -400,
            duration: 2,
            opacity: 0,
          },
          'layoutA+=.5'
        );

        tl.to(
          '.heroRainHolderTripleA',
          {
            y: -500,
            duration: 2,
            opacity: 0,
          },
          'layoutA+=.75'
        );

        tl.to(
          '.orangeBarHolderA',
          {
            y: -400,
            duration: 2,
            opacity: 0,
          },
          'layoutA+=1'
        );

        tl.to(
          '.heroRectangleA',
          {
            y: -500,
            duration: 2,
            opacity: 0,
          },
          'layoutA+=.75'
        );

        tl.from(
          '.heroRainHolderB',
          {
            y: '1150%',
            duration: 2.2,
            delay: 1,
          },
          'layoutB+=.25'
        );

        tl.from(
          '.riverAerialHolder',
          {
            y: '65%',
            duration: 2.2,
          },
          'layoutB+=1.25'
        );

        tl.from(
          '.heroRectangleHolderB',
          {
            y: '165%',
            duration: 2.5,
          },
          'layoutB+=.75'
        );
        tl.from(
          '.orangeBarHolderB',
          {
            y: '1400%',
            duration: 2.2,
          },
          'layoutB+=.5'
        );
      },
      '(max-width: 799px)': function () {},
    });

    // Cleaning up animation on page exit
    return () => {
      heroAnimation.kill();
    };
  }, []);

  return (
    <>
      {/* <Head></Head> */}

      <div className="hero202112Container" id="skip-link-target">
        <div className="hero202112A ">
          <div className="heroHolderA layoutA ">
            <div className="angleBracketDown "></div>
            <div className="heroSquareA ">
              {/* Begin Dynamic Meet Content */}
              {dynamicSrc === 'meet' ? (
                // 'meet' content
                <picture>
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240715/hero-2024-q2-01.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240715/hero-2024-q2-01.jpg"
                    type="image/jpeg"
                  />
                  <img
                    src="//images.utk.edu/images/www/hero20240715/hero-2024-q2-01.jpg"
                    alt="a smiling student holding large glow sticks in the middle of a sea of orange jams to a concert"
                  />
                </picture>
              ) : (
                // default content
                <picture>
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240320/hero-2024-q2-01.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240320/hero-2024-q2-01.jpg"
                    type="image/jpeg"
                  />
                  <img
                    src="//images.utk.edu/images/www/hero20240320/hero-2024-q2-01.jpg"
                    alt="A professor works with students on the MELD Machine inside the Machine Tool Research Center in the Dougherty Engineering Building."
                  />
                </picture>
              )}
              {/* End Dynamic Meet Content */}
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
            {/* BEGIN DYNAMIC CONTENT */}
            {dynamicSrc === 'awareness' ? (
              <>
                {/* 'awareness' content */}
                <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0">
                  <span className="text-condensed text-letterspaced fst-italic fs-2 italic-leading">
                    Welcome to
                  </span>
                  <br />
                  Rocky Top
                </h2>
                <div className="slate-squeeze mb-3">
                  <p className="fancyLink stack-links">
                    <a
                      href="https://www.utk.edu/admissions"
                      className="hero-cat"
                    >
                      Apply today
                    </a>
                  </p>
                  <p style={{ maxWidth: 'none' }}>
                    There’s something for everyone at UT. We can’t wait for you
                    to call our campus home sweet home! Get a free sticker when
                    you request info!
                  </p>
                  <SlateFormEmbed
                    id="3efe2258-fe6c-4e5e-a198-faf90c1a3634"
                    scriptSrc={
                      `https://govols.utk.edu/register/?id=3efe2258-fe6c-4e5e-a198-faf90c1a3634&output=embed&div=form_3efe2258-fe6c-4e5e-a198-faf90c1a3634` +
                      (location.search.length > 1
                        ? '&' + location.search.substring(1)
                        : '')
                    }
                  />
                </div>
                {/* Start of Q4 November 1st Push */}
                {/* <a
                onClick={handleShow}
                className="subLink pointer-event-visible  cursor-pointer"
              >
                Why apply by November 1?
              </a> */}
                <div
                  className="modal show"
                  style={{ display: 'block', position: 'initial' }}
                >
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <h3 className="mt-0">Take early action by November 1</h3>
                      <p>
                        There&apos;s never been a better time to be a Volunteer!
                        Apply by November 1 to be fully considered for the most
                        scholarship dollars, the new{' '}
                        <a href="https://admissions.utk.edu/guaranteed-admission/">
                          guaranteed admissions program
                        </a>
                        , and University Honors.
                      </p>
                      <p>
                        The regular admission application deadline is December
                        15.
                      </p>
                      <div className="fancyLinkGroup ch-md is-layout-flow">
                        <p className="fancyLink stack-links">
                          <a
                            href={appendDynamicSrc(
                              'https://www.utk.edu/admissions'
                            )}
                            className="hero-cat"
                          >
                            Apply today
                          </a>
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                {/* End of Q4 November 1st Push */}
              </>
            ) : dynamicSrc === 'meet' ? (
              <>
                {/* 'meet' content */}
                {/* <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0"> */}
                <h2
                  className={`${style['meet-cta']} text-uppercase display-3 mt-md-3 mt-lg-0`}
                >
                  <span className="text-condensed text-letterspaced fst-italic fs-2 italic-leading">
                    Welcome to
                  </span>
                  <br />
                  Rocky Top
                </h2>
                <div className="slate-squeeze mb-3">
                  <p style={{ maxWidth: 'none' }}>
                    UT is home to the Volunteers: people who use their talent,
                    creativity, and knowledge to shape a better future.
                  </p>
                  <p style={{ maxWidth: 'none' }}>
                    Tell us about yourself and get a free sticker!
                  </p>
                  <SlateFormEmbed
                    id="d9a5c913-3050-4fed-9a75-04aee3bdbed7"
                    scriptSrc={
                      `https://govols.utk.edu/register/?id=d9a5c913-3050-4fed-9a75-04aee3bdbed7&output=embed&div=form_d9a5c913-3050-4fed-9a75-04aee3bdbed7` +
                      (location.search.length > 1
                        ? '&' + location.search.substring(1)
                        : '')
                    }
                  />
                </div>
              </>
            ) : (
              <>
                {/* Default content */}
                <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0">
                  <span className="text-condensed text-letterspaced fst-italic fs-2 italic-leading">
                    Welcome to
                  </span>
                  <br />
                  Rocky Top
                </h2>
                <div className="fancyLinkGroup ch-md is-layout-flow">
                  {/* <p className="fancyLink stack-links">
                    <a href="https://www.utk.edu/visit" className="hero-cat">
                      Schedule a visit
                    </a>
                  </p> */}

                  <p className="fancyLink stack-links">
                    <a
                      href="https://www.utk.edu/admissions"
                      className="hero-cat"
                    >
                      Apply today
                    </a>
                  </p>

                  <p className="fancyLink stack-links">
                    <a
                      href={appendDynamicSrc('https://utk.edu/requestinfo')}
                      className="hero-cat"
                    >
                      Request more info
                    </a>
                  </p>
                </div>
                <p>
                  There’s something for everyone at UT. We can’t wait for you to
                  call our campus home sweet home!
                </p>

                {/* Why Apply Format */}
                {/* <a
                  onClick={handleShow}
                  className="subLink pointer-event-visible  cursor-pointer"
                >
                  Why apply by December 15?
                </a>
                <div
                  className="modal show"
                  style={{ display: 'block', position: 'initial' }}
                >
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <h3 className="mt-0">Fall Deadline</h3>
                      <p>
                        If you’re a high school senior who would like to be a
                        Vol in fall 2024, apply by December 15.
                      </p>
                      <p>
                        You’ll be automatically considered for institutional
                        scholarships if you submit your application by this
                        date.
                      </p>

                      <div className="fancyLinkGroup ch-md is-layout-flow">
                        <p className="fancyLink stack-links">
                          <a
                            href="https://www.utk.edu/admissions"
                            className="hero-cat"
                          >
                            Apply today
                          </a>
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div> */}
                {/* End of Q4 November 1st Push */}
              </>
            )}

            {/* Confirm Enrollment Link */}
            {/* <h3 className="subCta">Admitted to UT?</h3>
            <a
              href="https://admissions.utk.edu/confirm/"
              className="subLink  pointer-event-visible"
              // orange underline
              // className="subLink text-decoration-none link-underline  pointer-event-visible"
            >
              Confirm enrollment now
            </a> */}
            {/* End Confirm Enrollment Link */}
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
              {/* Begin Dynamic Meet Content */}
              {dynamicSrc === 'meet' ? (
                // 'meet' content
                <picture>
                  <source
                    media="(max-width:767px)"
                    srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-mobile-01.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width:767px)"
                    srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-mobile-01.jpg"
                    type="image/jpeg"
                  />
                  <source
                    media="(min-width:768px)"
                    srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-01.webp"
                    type="image/webp"
                  />
                  <source
                    media="(min-width:768px)"
                    srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-01.jpg"
                    type="image/jpeg"
                  />
                  <img
                    src="//images.utk.edu/images/www/hero20240715/skyline-blue-mobile-02.jpg"
                    alt="Knoxville skyline as seen from the University of Tennessee campus"
                  />
                </picture>
              ) : (
                // default content
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
                    src="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.jpg"
                    alt="sunset over the Tennessee River that surrounds campus"
                  />
                </picture>
              )}
              {/* End Dynamic Meet Content */}
            </div>
            <div className="angleBracketUp"></div>
          </div>

          {/* Begin Layout B Items*/}
          <div className="heroHolderB layoutB">
            <div className="angleBracketDown angleSpaceMatchB softAppearItem"></div>
            <div className="heroSquareB layoutB">
              {/* Begin Dynamic Meet Content */}
              {dynamicSrc === 'meet' ? (
                // 'meet' content
                <picture>
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240715/hero-image-smokey-crowdsurfing.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240715/hero-image-smokey-crowdsurfing.jpg"
                    type="image/jpeg"
                  />
                  <img
                    src="//images.utk.edu/images/www/hero20240715/hero-image-smokey-crowdsurfing.jpg"
                    alt="The Smokey mascot crowdsurfs through a sea of smiling fans"
                  />
                </picture>
              ) : (
                // default content
                <picture>
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240602/hero-image-glow-sticks-b2-02.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="//images.utk.edu/images/www/hero20240602/hero-image-glow-sticks-b2-02.jpg"
                    type="image/jpeg"
                  />
                  <img
                    src="//images.utk.edu/images/www/hero20240602/hero-image-glow-sticks-b2-02.jpg"
                    alt="a smiling student holding large glow sticks in the middle of a sea of orange jams to a concert"
                  />
                </picture>
              )}
              {/* End Dynamic Meet Content */}
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
      {/* end hero202112Container */}
      {/* <div className="container">
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
      </div> */}
      {}
    </>
  );
};

export default Hero;
