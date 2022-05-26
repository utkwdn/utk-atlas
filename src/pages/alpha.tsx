import Layout from "../components/Layout";
import Head from "next/head";
import styles from "scss/pages/alpha.module.scss";
import Script from "next/script";
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';

function Alpha() {
  const Search = console.log("Search button will eventually do something");

  const { useQuery } = client;

  const alphaIndex = useQuery().allAToZ({
    first: 1000,
    where: {
      orderby:[ {
        field: PostObjectsConnectionOrderbyEnum.TITLE,
        order: OrderEnum.ASC
      } ]
    }
  });

  //alphaIndex.nodes.map((this_alpha) => {

    //if( this_alpha.title()?.toString()?.toLowerCase()?.startsWith("a") ){
      //console.log(this_alpha.title())
      //console.log(this_alpha.aToZFields.url)
    //}

  // } );

  return (
    <Layout>
      <Head>

      </Head>
      <section className={styles["intro-container"]}>
        <div className={styles["page-title-group"]}>
          <hr className={styles["oa-thick-bar"]} />
          <h1 className={[styles.area, "text-condensed"].join(" ")}>
            A-Z Index
          </h1>
          <div className={styles["title-container"]}>
            <p className={styles["title"]}>Locate the Sites You Need</p>
          </div>
        </div>
        <div className={styles.intro}>
          <p>
            This tool will help you locate the sites you’re looking for and
            more. If you find a broken link or would like to add or update an
            existing link,{" "}
            <a href="https://communications.utk.edu/a-z-index-update-request/">
              please let us know
            </a>
            .
          </p>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["form-control"]}
              type="text"
              list="alphaDataList"
              placeholder="Type to search..."
            />
            <button > Search </button>

            <datalist
              id="alphaDataList"
            />
          </div>
        </div>
      </section>
      <section className={styles["alpha-container"]}>
        <div className={styles.alpha}>
          <a href="#a">A</a>
          <a href="#b">B</a>
          <a href="#c">C</a>
          <a href="#d">D</a>
          <a href="#e">E</a>
          <a href="#f">F</a>
          <a href="#g">G</a>
          <a href="#h">H</a>
          <a href="#i">I</a>
          <a href="#j">J</a>
          <a href="#k">K</a>
          <a href="#l">L</a>
          <a href="#m">M</a>
          <a href="#n">N</a>
          <a href="#o">O</a>
          <a href="#p">P</a>
          <a href="#q">Q</a>
          <a href="#r">R</a>
          <a href="#s">S</a>
          <a href="#t">T</a>
          <a href="#u">U</a>
          <a href="#v">V</a>
          <a href="#w">W</a>
          <a href="#x">X</a>
          <a href="#y">Y</a>
          <a href="#z">Z</a>
        </div>
      </section>
      <section className={styles.results}>
        {[[/*
   //Basic Pattern for data use

      <div className={styles["letter-group"]}>
        <div className={styles["letter-container"]}>
          <h2 id="a" className={styles.letter}>
            {item.categoryLetter}
          </h2>
        </div>
        <ul>
        <li className={styles["result-title"]}>
          <a href="#">
            {item.resultTitle}
            // add below span class around search terms to make bolder
            // <span className={styles["result-search-term"]}>{item.searchTerm}</span>
          </a>
          <br />
          <span className={styles["result-url"]}>
            {item.resultUrl}
          </span>
        </li>
        </ul>
          </div>

          */]]}

        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="a" className={styles.letter}>
              A
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.startsWith("a") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="b" className={styles.letter}>
              B
            </h2>
          </div>
          <ul>
            <li className={styles["result-title"]}>
              <a href="#">
                Bcademic Success{" "}
                <span className={styles["result-search-term"]}>Center</span>
              </a>
              <br />
              <span className={styles["result-url"]}>
                studentsuccess.utk.edu/academicsuccess/
              </span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">
                Bdvanced Microscopy and Imaging
                <span className={styles["result-search-term"]}>Center</span>
              </a>
              <br />
              <span className={styles["result-url"]}>microscopy.utk.edu/</span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">
                Bnderson
                <span className={styles["result-search-term"]}>Center</span> for
                Entrepreneurship and Innovation
              </a>
              <br />
              <span className={styles["result-url"]}>
                haslam.utk.edu/anderson-center
              </span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">Bcademic Success Center</a>
              <br />
              <span className={styles["result-url"]}>
                studentsuccess.utk.edu/academicsuccess/
              </span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">
                Bdvanced Microscopy and Imaging
                <span className={styles["result-search-term"]}> Center</span>
              </a>
              <br />
              <span className={styles["result-url"]}>microscopy.utk.edu/</span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">
                Bnderson
                <span className={styles["result-search-term"]}>Center</span> for
                Entrepreneurship and Innovation
              </a>
              <br />
              <span className={styles["result-url"]}>
                haslam.utk.edu/anderson-center
              </span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">Bcademic Success Center</a>
              <br />
              <span className={styles["result-url"]}>
                studentsuccess.utk.edu/academicsuccess/
              </span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">
                Bdvanced Microscopy and Imaging
                <span className={styles["result-search-term"]}> Center</span>
              </a>
              <br />
              <span className={styles["result-url"]}>microscopy.utk.edu/</span>
            </li>
            <li className={styles["result-title"]}>
              <a href="#">
                Bnderson
                <span className={styles["result-search-term"]}>Center</span> for
                Entrepreneurship and Innovation
              </a>
              <br />
              <span className={styles["result-url"]}>
                haslam.utk.edu/anderson-center
              </span>
            </li>
          </ul>
        </div>
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="c" className={styles.letter}>
              C
            </h2>
          </div>
          <ul>
            <li className={styles["result-title"]}>
              <a href="#">
                Ccademic Success{" "}
                <span className={styles["result-search-term"]}>Center</span>
              </a>
              <br />
              <span className={styles["result-url"]}>
                studentsuccess.utk.edu/academicsuccess/
              </span>
            </li>
          </ul>
        </div>
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="d" className={styles.letter}>
              D
            </h2>
          </div>
          <ul>
            <li className={styles["result-title"]}>
              <a href="#">
                Dcademic Success{" "}
                <span className={styles["result-search-term"]}>Center</span>
              </a>
              <br />
              <span className={styles["result-url"]}>
                studentsuccess.utk.edu/academicsuccess/
              </span>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default Alpha;
