import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import doubleRainSvg from '/public/images/home-hero/rain-double-01.svg';
import tripleRainSvg from '/public/images/home-hero/rain-triple-01.svg';
import LayoutASquareImage from './hero-parts/LayoutASquareImage';
import LayoutAVerticalImage from './hero-parts/LayoutAVerticalImage';
import CTA from './hero-parts/CTA';
import LayoutBHorizontalImage from './hero-parts/LayoutBHorizontalImage';
import LayoutBSquareImage from './hero-parts/LayoutBSquareImage';
import LayoutBVerticalImage from './hero-parts/LayoutBVerticalImage';

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(' ');

const Hero = () => {
  const [dynamicSrc, setDynamicSrc] = useState('');

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

            {/* Layout A Square Image */}
            <LayoutASquareImage dynamicSrc={dynamicSrc} />
          </div>

          <div className="heroRainHolderA layoutA ">
            <picture>
              <source
                media="(max-width:767px)"
                srcSet="/images/home-hero/rain-double-01.svg"
              />
              <source
                media="(min-width:768px)"
                srcSet="/images/home-hero/rain-single-01.svg"
              />
              <Image src={doubleRainSvg} alt="Double Rain Texture" />
            </picture>
          </div>

          {/* Layout A Vertical Image */}
          <LayoutAVerticalImage dynamicSrc={dynamicSrc} />

          <div className="dotSquareHolder"></div>

          {/* CTA */}
          <CTA dynamicSrc={dynamicSrc} />

          <div className="heroRainHolderTripleA layoutA ">
            <picture>
              <source
                media="(min-width:828px)"
                srcSet="/images/home-hero/rain-triple-01.svg"
              />
              <Image src={tripleRainSvg} alt="Triple Rain Texture" />
            </picture>
          </div>
          <div className="orangeBarHolderA layoutA ">
            <div className="ginghamChunkA"></div>
            <div className="orangeBarChunkA"></div>
          </div>

          {/* Layout B Horizontal Image */}
          <LayoutBHorizontalImage dynamicSrc={dynamicSrc} />

          {/* Layout B Square Image */}
          <LayoutBSquareImage dynamicSrc={dynamicSrc} />

          <div className="heroRainHolderB layoutB ">
            <Image src={doubleRainSvg} alt="Double Rain Texture" />
          </div>

          {/* Layout B Vertical Image */}
          <LayoutBVerticalImage dynamicSrc={dynamicSrc} />

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
