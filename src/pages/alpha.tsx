import Layout from '../components/Layout';
import styles from 'scss/pages/alpha.module.scss';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';

import Intro from '../components/Intro';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

const upperLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
] as const;

const chars = ['#', ...upperLetters] as const;

type UpperLetter = typeof upperLetters[number];
type Character = typeof chars[number];

const upperLetterRegExp = /^[A-Z]$/;
const isUpperLetter = (s: string): s is UpperLetter =>
  !!s.match(upperLetterRegExp);

const digitRegExp = /^\d$/;
const isDigit = (s: string) => !!s.match(digitRegExp);

const toDomId = (char: Character) => (char === '#' ? 'num' : char);

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

    const firstCharUpper = title[0].toUpperCase();

    let key: Character;

    if (isDigit(firstCharUpper)) {
      key = '#';
    } else if (isUpperLetter(firstCharUpper)) {
      key = firstCharUpper;
    } else {
      return map;
    }

    const value = { title, url, id };

    const values = map.get(key);
    if (values) {
      values.push(value);
    } else {
      map.set(key, [value]);
    }

    return map;
  }, new Map<Character, { title: string; url: string; id: string }[]>());

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
              <a key={char} href={`#${toDomId(char)}`}>
                {char}
              </a>
            );
          })}
        </div>
      </section>
      <section className={styles.results}>
        {activeChars.map((char) => (
          <div key={char} className={styles['letter-group']}>
            <div className={styles['letter-container']}>
              <h2 id={toDomId(char)} className={styles.letter}>
                {char}
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
