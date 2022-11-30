import Layout from '../components/Layout';
import styles from 'scss/pages/alpha.module.scss';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';
import Intro from '../components/Intro';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import TextField from '@mui/material/TextField';
import { matchSorter } from 'match-sorter';
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
import { Button } from 'react-bootstrap';

const NO_RESULTS = 'No results found';

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

type Item = { label: string; url: string; id: string };
type UpperLetter = typeof upperLetters[number];
type Character = typeof chars[number];

const upperLetterRegExp = /^[A-Z]$/;
const isUpperLetter = (s: string): s is UpperLetter =>
  upperLetterRegExp.test(s);

const digitRegExp = /^\d$/;
const isDigit = (s: string) => digitRegExp.test(s);

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

  const itemsByChar = useRef(
    rawItems.reduce((map, item) => {
      if (!item) return map;

      const label = item.title();
      const url = item.aToZFields?.url;
      const id = item.id;

      if (!label || !url || !id) return map;

      const firstCharUpper = label[0].toUpperCase();

      let key: Character;

      if (isDigit(firstCharUpper)) {
        key = '#';
      } else if (isUpperLetter(firstCharUpper)) {
        key = firstCharUpper;
      } else {
        return map;
      }

      const value = { label, url, id };

      const values = map.get(key);
      if (values) {
        values.push(value);
      } else {
        map.set(key, [value]);
      }

      return map;
    }, new Map<Character, Item[]>())
  );

  const allChars = useRef(Array.from(itemsByChar.current.keys()));
  const allItems = useRef(Array.from(itemsByChar.current.values()).flat());

  const [activeItems, setActiveItems] = useState(allItems.current);

  const activeChars = allChars.current.filter((char) => {
    if (char === '#') {
      return activeItems.some(({ label }) => isDigit(label[0]));
    } else {
      return activeItems.some(({ label }) =>
        label.toUpperCase().startsWith(char)
      );
    }
  });

  const _handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const { value } = e.target;

      if (!value) return setActiveItems(allItems.current);

      const results = matchSorter(allItems.current, value, {
        keys: ['label'],
        threshold: matchSorter.rankings.CONTAINS,
      });

      setActiveItems(results);
    },
    []
  );

  const handleChange = useMemo(
    () => debounce(_handleChange, 250),
    [_handleChange]
  );

  const resultsNavRef = useRef<HTMLElement>(null);
  const noResultsRef = useRef<HTMLHeadingElement>(null);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    /*
      Wait to ensure that results are up to date (because of debounced change-handler).
      If there are results, move keyboard-focus to results alpha-nav.
      If there are no results, announce that to screen-readers (but leave focus in input box).
    */
    setTimeout(() => {
      if (resultsNavRef.current) {
        resultsNavRef.current.focus();
      } else if (noResultsRef.current) {
        noResultsRef.current.textContent = '';
        noResultsRef.current.textContent = NO_RESULTS;
      }
    }, 250);
  }, []);

  return (
    <Layout>
      {/* TODO: Provide meta/title stuff in Head here */}
      {/* <Head></Head> */}
      <Intro title={'A-Z Index'} theme={''} intro={<div></div>} />
      <section className={styles['container']}>
        <div className={styles['search-container']}>
          <h3>Browse the site index</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={handleChange}
                type="search"
                label="Find a Site"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>

          <section className={styles['alpha-container']}>
            {activeChars.length > 0 ? (
              <nav
                className={styles.alpha}
                ref={resultsNavRef}
                tabIndex={-1}
                /* Can we come up with a better label for this? */
                aria-label="Jump to search results by starting character"
              >
                {activeChars.map((char) => {
                  return (
                    <a key={char} href={`#${toDomId(char)}`}>
                      {char}
                    </a>
                  );
                })}
              </nav>
            ) : (
              /*
                Use assertive so that screen-readers announce "No results found" as soon as possible
                while user is typing in search-box. In the form-submit handler, we also trigger
                a re-announcement if needed (see `handleSubmit` above).
              */
              <h3 aria-live="assertive" aria-relevant="all" ref={noResultsRef}>
                {NO_RESULTS}
              </h3>
            )}
          </section>
          <a
            href="https://communications.utk.edu/a-z-index-update-request/"
            className={styles.fancyLink}
          >
            Request an update to the index
          </a>
        </div>
        <section className={styles.results}>
          {activeChars.map((char) => (
            <div key={char} className={styles['letter-group']}>
              <div className={styles['letter-container']}>
                <h2 id={toDomId(char)} className={styles.letter}>
                  {char}
                </h2>
              </div>
              <ul>
                {itemsByChar.current.get(char)?.flatMap((item) =>
                  activeItems.includes(item) ? (
                    <li key={item.id} className={styles['result-title']}>
                      <a href={item.url}>{item.label}</a>
                      <br />
                      <span className={styles['result-url']}>
                        {item.url.replace(/^https?:\/\//, '')}
                      </span>
                    </li>
                  ) : (
                    []
                  )
                )}
              </ul>
            </div>
          ))}
        </section>
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
