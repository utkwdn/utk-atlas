import Layout from "../components/Layout";
import Head from "next/head";
import Intro from "../components/Intro";
import styles from "scss/pages/Programs.module.scss";
import Script from "next/script";

function Programs() {
  return (
    <Layout>
      <Intro
        title={"Programs"}
        theme={"Find Your Passion"}
        intro={
          <p>
            "So many options and paths to choose from. Find what makes you happy
            and live a great life."
          </p>
        }
      />
      <section className={styles.areasContainer}>
        {/* CONTENT HOLDER FOR CARDS */}
        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles["oa-period"]}>.</span>
                <br />
                Performance<span className={styles["oa-period"]}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, "btn-link"].join(" ")} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles["oa-period"]}>.</span>
                <br />
                Performance<span className={styles["oa-period"]}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, "btn-link"].join(" ")} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles["oa-period"]}>.</span>
                <br />
                Performance<span className={styles["oa-period"]}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, "btn-link"].join(" ")} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.areaCard}>
          <div className={styles.areaTeaser}>
            <div className={styles.areaTitle}>
              <h2>
                Art<span className={styles["oa-period"]}>.</span>
                <br />
                Performance<span className={styles["oa-period"]}>.</span>
              </h2>
            </div>
            {/* End ProgramTitle */}
            <div className={styles.areaImage}>
              <img src="//images.utk.edu/designsystem/academics/areas/art-performance.jpg" />
            </div>
            {/* End areaImage */}
            <p>
              Learn how to shape the world around you through visual arts. Use
              aesthetics to change cities or shape the understanding of print
              and digital landscapes.
            </p>
            <a className={[styles.btnTweak, "btn-link"].join(" ")} href="#">
              Request Information
            </a>
          </div>
          {/* End programTeaser */}
          <div className={styles.programList}>
            <ul>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
              <li>
                <a href="#">
                  <span className={styles.programName}>Art History</span>
                </a>
                <br />
                <span className={styles.programCollege}>
                  <span className={styles.programDegrees}>BA, MA</span>
                  College of Archtiecture and Design
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* End areaContainer */}
      </section>
    </Layout>
  );
}

export default Programs;
