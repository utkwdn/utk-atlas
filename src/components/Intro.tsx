import styles from "scss/components/Intro.module.scss";
const Intro = ({ title, theme, intro }) => {
  return (
    <section className={styles["intro-container"]}>
      <div className={styles["page-title-group"]}>
        <hr className={styles["oa-thick-bar"]} />
        <h1 className={[styles.area, "text-condensed"].join(" ")}>{title}</h1>
        <div className={styles["title-container"]}>
          <p className={styles["title"]}>{theme}</p>
        </div>
      </div>
      <div className={styles.intro}>{intro}</div>
    </section>
  );
};
export default Intro;
