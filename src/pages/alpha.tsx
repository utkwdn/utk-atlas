import Layout from '../components/Layout';
import styles from 'scss/pages/alpha.module.scss';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';

import Intro from '../components/Intro';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
] as const;

const chars = ['#', ...letters] as const;

const Alpha = () => {
  const { useQuery } = client;

  const rawItems =
    useQuery().allAToZ({
      first: 1000, // is this enough?
      where: {
        orderby: [
          {
            field: PostObjectsConnectionOrderbyEnum.TITLE,
            order: OrderEnum.ASC,
          },
        ],
      },
    })?.nodes || [];

  const itemsByChar = rawItems.reduce((map, item) => {
    if (!item) return map;

    const title = item.title();
    const url = item.aToZFields?.url;
    const id = item.id;

    if (!title || !url || !id) return map;

    const firstChar = title[0].toLowerCase();

    const key = firstChar.match(/\d/)
      ? '#'
      : letters.find((letter) => firstChar.startsWith(letter));
    if (!key) return map;

    const value = { title, url, id };

    const values = map.get(key);
    if (values) {
      values.push(value);
    } else {
      map.set(key, [value]);
    }

    return map;
  }, new Map<typeof chars[number], { title: string; url: string; id: string }[]>());

  const activeChars = Array.from(itemsByChar.keys());

  return (
    <Layout>
      {/* <Head></Head> */}
      <Intro
        title={'A-Z Index'}
        theme={'Locate the Sites You Need'}
        intro={
          <div>
            <p className="lead">
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
        }
      />

      <section className={styles['alpha-container']}>
        <div className={styles.alpha}>
          {activeChars.map((char) => {
            return (
              <a key={char} href={`#${char === '#' ? 'num' : char}`}>
                {char.toUpperCase()}
              </a>
            );
          })}
        </div>
      </section>
      <section className={styles.results}>
        {activeChars.map((char) => (
          <div key={char} className={styles['letter-group']}>
            <div className={styles['letter-container']}>
              <h2 id={char === '#' ? 'num' : char} className={styles.letter}>
                {char.toUpperCase()}
              </h2>
            </div>
            <ul>
              {itemsByChar.get(char)?.map(({ title, url, id }) => (
                <li key={id} className={styles['result-title']}>
                  <a href={url}>{title}</a>
                  <br />
                  <span className={styles['result-url']}>
                    {url.replace(/^https?:\/\//, '')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Alpha;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: Alpha,
    client,
  });
}
