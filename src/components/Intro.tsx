import styles from 'scss/components/Intro.module.scss';

type IntroProps = {
  title: string;
  theme: string;
  intro: object;
};

/** Intro component created to be able to easily swap out the main intro chunk of content for a page.
 * Contains:
 * – demphasized H1 {title}
 * – emphasized <p> {theme} (main message/title for the page treated visually like an H1)
 * – flexible {intro} sub-section that contains supporting graphic/video/etc (currently html added in each instance)
 * (eventually envision {intro} using other swappable or nested components to add flexibility of content type used in this space – but these need to be identified and created. TBD)
 */

const Intro: React.FunctionComponent<IntroProps> = ({
  title,
  theme,
  intro,
  // imagesrc,
  // alt,
}) => {
  return (
    <section className={styles['intro-container']}>
      <div className={styles['page-title-group']}>
        {/* <hr className={styles['oa-thick-bar']} /> */}
        <h1 className={[styles.area, 'text-condensed'].join(' ')}>{title}</h1>
        <div className={styles['theme-container']}>
          <p className={styles['theme']}>{theme}</p>
        </div>
        <div className={styles.intro}>{intro}</div>
      </div>
      <div className={[styles['intro-img-group'], 'framed'].join(' ')}>
        {/* <img src={imagesrc} alt={alt} /> */}
      </div>
    </section>
  );
};
export default Intro;
