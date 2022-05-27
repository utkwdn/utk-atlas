import Layout from "../components/Layout";
import Head from "next/head";
import styles from "scss/pages/alpha.module.scss";
import Script from "next/script";
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';
import { TRUE } from "sass";

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

  function isLetter(this_letter){
    let aLetter = alphaIndex.nodes.map((this_alpha) => {
      //console.log(this_letter);
      if( this_alpha.title()?.toString()?.toLowerCase()?.match("^" + this_letter) ){
        return true;
      }
    } );

    return aLetter.includes(true);
  };

  //console.log(isLetter([0-9]));

  //alphaIndex.nodes.map((this_alpha) => {

    //let a_letter = "[0-9]";

    //if( this_alpha.title()?.toString()?.toLowerCase()?.match("^" + a_letter) ){
      //console.log(this_alpha.title())
      //console.log(this_alpha.aToZFields.url)
    //}

  //} );

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
        { isLetter("[0-9]") === true && ( <a href="#num">#</a> ) }
        { isLetter("a") === true && ( <a href="#a">A</a> ) }
        { isLetter("b") === true && ( <a href="#b">B</a> ) }
        { isLetter("c") === true && ( <a href="#c">C</a> ) }
        { isLetter("d") === true && ( <a href="#d">D</a> ) }
        { isLetter("e") === true && ( <a href="#e">E</a> ) }
        { isLetter("f") === true && ( <a href="#f">F</a> ) }
        { isLetter("g") === true && ( <a href="#g">G</a> ) }
        { isLetter("h") === true && ( <a href="#h">H</a> ) }
        { isLetter("i") === true && ( <a href="#i">I</a> ) }
        { isLetter("j") === true && ( <a href="#j">J</a> ) }
        { isLetter("k") === true && ( <a href="#k">K</a> ) }
        { isLetter("l") === true && ( <a href="#l">L</a> ) }
        { isLetter("m") === true && ( <a href="#m">M</a> ) }
        { isLetter("n") === true && ( <a href="#n">N</a> ) }
        { isLetter("o") === true && ( <a href="#o">O</a> ) }
        { isLetter("p") === true && ( <a href="#p">P</a> ) }
        { isLetter("q") === true && ( <a href="#q">Q</a> ) }
        { isLetter("r") === true && ( <a href="#r">R</a> ) }
        { isLetter("s") === true && ( <a href="#s">S</a> ) }
        { isLetter("t") === true && ( <a href="#t">T</a> ) }
        { isLetter("u") === true && ( <a href="#u">U</a> ) }
        { isLetter("v") === true && ( <a href="#v">V</a> ) }
        { isLetter("w") === true && ( <a href="#w">W</a> ) }
        { isLetter("x") === true && ( <a href="#x">X</a> ) }
        { isLetter("y") === true && ( <a href="#y">Y</a> ) }
        { isLetter("z") === true && ( <a href="#z">Z</a> ) }
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
        { isLetter("[0-9]") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="num" className={styles.letter}>
              #
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^[0-9]") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("a") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="a" className={styles.letter}>
              A
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^a") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("b") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="b" className={styles.letter}>
              B
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^b") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("c") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="c" className={styles.letter}>
              C
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^c") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("d") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="d" className={styles.letter}>
              D
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^d") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("e") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="e" className={styles.letter}>
              E
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^e") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("f") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="f" className={styles.letter}>
              F
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^f") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("g") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="g" className={styles.letter}>
              G
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^g") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("h") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="h" className={styles.letter}>
              H
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^h") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("i") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="i" className={styles.letter}>
              I
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^i") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("j") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="j" className={styles.letter}>
              J
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^j") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("k") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="k" className={styles.letter}>
              K
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^k") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("l") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="l" className={styles.letter}>
              L
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^l") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("m") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="m" className={styles.letter}>
              M
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^m") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("n") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="n" className={styles.letter}>
              N
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^n") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("o") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="o" className={styles.letter}>
              O
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^o") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("p") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="p" className={styles.letter}>
              P
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^p") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("q") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="q" className={styles.letter}>
              Q
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^q") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("r") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="r" className={styles.letter}>
              R
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^r") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("s") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="s" className={styles.letter}>
              S
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^s") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("t") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="t" className={styles.letter}>
              T
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^t") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("u") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="u" className={styles.letter}>
              U
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^u") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("v") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="v" className={styles.letter}>
              V
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^v") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("w") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="w" className={styles.letter}>
              W
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^w") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("x") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="x" className={styles.letter}>
              X
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^x") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("y") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="y" className={styles.letter}>
              Y
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^y") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
        { isLetter("z") === true && (
        <div className={styles["letter-group"]}>
          <div className={styles["letter-container"]}>
            <h2 id="z" className={styles.letter}>
              Z
            </h2>
          </div>
          <ul>
            { alphaIndex.nodes.map((this_alpha) => (
              <>
              { this_alpha?.title()?.toString()?.toLowerCase()?.match("^z") && (
            <li className={styles["result-title"]}>
            <a href={this_alpha.aToZFields.url}>
              { this_alpha.title() }
            </a>
            <br />
            <span className={styles["result-url"]}>
              {this_alpha.aToZFields.url?.replace(/^https?:\/\//, "")}
            </span>
          </li>
              ) }
              </>
             ) ) }
          </ul>
        </div>
        ) }
      </section>
    </Layout>
  );
}

export default Alpha;
