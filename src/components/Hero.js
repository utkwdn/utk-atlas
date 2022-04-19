import styles from "scss/components/Hero.module.scss";
import Head from "next/head";
// import Script from "next/script";
// need to pull scripts for animation:
// "js/202112-hero-visit-gsap.min.js"
// "js/202112-hero-visit-ScrollTrigger.min.js"
// "js/202112-hero-visit.js"

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(" ");

// HomeHero is a section added to index.tx

const Hero = () => {
  return (
    <>
      <Head></Head>
      <div className={styles.hero2022FallContainer}>
        <div className={styles.hero2022Fall}>
          <h2>HERO | Apply Now Message</h2>
        </div>
      </div>
    </>
  );
};

export default Hero;
