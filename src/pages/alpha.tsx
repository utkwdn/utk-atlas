import Layout from '../components/Layout';
import Head from 'next/head';
import styles from 'scss/pages/alpha.module.scss';
import Script from 'next/script';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';
import { TRUE } from 'sass';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Alpha() {
  const Search = console.log('Search button will eventually do something');

  const { useQuery } = client;

  const alphaIndex = useQuery().allAToZ({
    first: 1000,
    where: {
      orderby: [
        {
          field: PostObjectsConnectionOrderbyEnum.TITLE,
          order: OrderEnum.ASC,
        },
      ],
    },
  });

  function isLetter(this_letter: string) {
    let aLetter = alphaIndex?.nodes?.map((this_alpha) => {
      //console.log(this_letter);
      if (
        this_alpha
          ?.title()
          ?.toString()
          ?.toLowerCase()
          ?.match('^' + this_letter)
      ) {
        return true;
      }
    });

    return aLetter?.includes(true);
  }

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
      {/* <Head></Head> */}
      <section className={styles['intro-container']}>
        <div className={styles['page-title-group']}>
          <hr className={styles['oa-thick-bar']} />
          <h1 className={[styles.area, 'text-condensed'].join(' ')}>
            A-Z Index
          </h1>
          <div className={styles['title-container']}>
            <p className={styles['title']}>Locate the Sites You Need</p>
          </div>
        </div>
        <div className={styles.intro}>
          <p>
            This tool will help you locate the sites you’re looking for and
            more. If you find a broken link or would like to add or update an
            existing link,{' '}
            <a href="https://communications.utk.edu/a-z-index-update-request/">
              please let us know
            </a>
            .
          </p>
          <div className={styles['input-wrapper']}>
            <input
              className={styles['form-control']}
              type="text"
              list="alphaDataList"
              placeholder="Type to search..."
            />
            <button> Search </button>

            <datalist id="alphaDataList" />
          </div>
        </div>
      </section>
      <section className={styles['alpha-container']}>
        <div className={styles.alpha}>
          {isLetter('[0-9]') && <a href="#num">#</a>}
          {letters.flatMap((letter) =>
            isLetter(letter) ? (
              <a key={letter} href={`#${letter}`}>
                {letter.toUpperCase()}
              </a>
            ) : (
              []
            )
          )}
        </div>
      </section>
      <section className={styles.results}>
        {[
          [
            /*
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

          */
          ],
        ]}
        {isLetter('[0-9]') === true && (
          <div className={styles['letter-group']}>
            <div className={styles['letter-container']}>
              <h2 id="num" className={styles.letter}>
                #
              </h2>
            </div>
            <ul>
              {alphaIndex?.nodes?.flatMap((this_alpha, i) => {
                const url = this_alpha?.aToZFields?.url;
                if (
                  url &&
                  this_alpha
                    ?.title()
                    ?.toString()
                    ?.toLowerCase()
                    ?.match('^[0-9]')
                ) {
                  return (
                    <li key={i} className={styles['result-title']}>
                      <a href={url}>{this_alpha.title()}</a>
                      <br />
                      <span className={styles['result-url']}>
                        {url.replace(/^https?:\/\//, '')}
                      </span>
                    </li>
                  );
                } else {
                  return [];
                }
              })}
            </ul>
          </div>
        )}
        {letters.flatMap((letter) => {
          if (isLetter(letter)) {
            return (
              <div key={letter} className={styles['letter-group']}>
                <div className={styles['letter-container']}>
                  <h2 id={letter} className={styles.letter}>
                    {letter.toUpperCase()}
                  </h2>
                </div>
                <ul>
                  {alphaIndex?.nodes?.flatMap((this_alpha, i) => {
                    const url = this_alpha?.aToZFields?.url;
                    if (
                      url &&
                      this_alpha
                        ?.title()
                        ?.toString()
                        ?.toLowerCase()
                        ?.match(`^${letter}`)
                    ) {
                      return (
                        <li key={i} className={styles['result-title']}>
                          <a href={url}>{this_alpha.title()}</a>
                          <br />
                          <span className={styles['result-url']}>
                            {url.replace(/^https?:\/\//, '')}
                          </span>
                        </li>
                      );
                    } else {
                      return [];
                    }
                  })}
                </ul>
              </div>
            );
          } else {
            return [];
          }
        })}
      </section>
    </Layout>
  );
}

export default Alpha;
