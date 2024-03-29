import Layout from '../components/Layout';
import styles from 'scss/pages/alpha.module.scss';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustwp/core';
import TextField from '@mui/material/TextField';
import { matchSorter } from 'match-sorter';
import Head from 'next/head';
import Link from 'next/link';
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
// import { Button } from 'react-bootstrap';
import InputAdornment from '@mui/material/InputAdornment';

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
type UpperLetter = (typeof upperLetters)[number];
type Character = (typeof chars)[number];

const upperLetterRegExp = /^[A-Z]$/;
const isUpperLetter = (s: string): s is UpperLetter =>
  upperLetterRegExp.test(s);

const digitRegExp = /^\d$/;
const isDigit = (s: string) => digitRegExp.test(s);

/**
 * If `'#'` is in `arr`, returns a new array that's the same as `arr` but with `'#'` moved to the very end.
 * Otherwise, just returns `arr`.
 */
const poundToEnd = (arr: Character[]) => {
  if (arr.includes('#')) {
    return arr.filter((e) => e !== '#').concat('#');
  }
  return arr;
};

const toDomId = (char: Character) => (char === '#' ? 'num' : char);

interface PropsObject {
  data: {
    allAToZ: {
      nodes: {
        id: string;
        title: string;
        aToZFields: {
          tags: string;
          url: string;
        };
      }[];
    };
  };
}

const Alpha = () => {
  // const rawItems = propsData.data?.allAToZ?.nodes;
  const { data } = useQuery(Alpha.query);
  const rawItems = data?.allAToZ?.nodes;

  // interface CharItem {
  //   title: string;
  //   id: string;
  //   aToZFields: { tags: string; url: string };
  // }

  const itemsByChar = useRef(
    rawItems?.reduce((map, item) => {
      if (!item) return map;

      const label = item.title;
      const tags = item.aToZFields?.tags || '';
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

      const value = { label, url, id, tags };

      const values = map.get(key);
      if (values) {
        values.push(value);
      } else {
        map.set(key, [value]);
      }

      return map;
    }, new Map<Character, Item[]>())
  );

  /**
   * All characters represented in the fetched data, sorted alphabetically (with `'#'` at the end, if present).
   * Will never change.
   */
  const itemsByCharKeysArray = itemsByChar.current
    ? Array.from(itemsByChar.current.keys())
    : [];
  const allChars = useRef(poundToEnd(itemsByCharKeysArray));

  /** All items represented in the fetched data. Will never change. */
  const itemsByCharValuesArray = itemsByChar.current
    ? Array.from(itemsByChar.current.values()).flat()
    : [];
  const allItems = useRef(itemsByCharValuesArray);

  const [activeItems, setActiveItems] = useState(allItems.current);

  const activeChars = allChars.current.filter((char) => {
    if (char === '#') {
      return activeItems.some(({ label }) => isDigit(label[0]));
    } else {
      return activeItems.some(({ label }) => label[0].toUpperCase() === char);
    }
  });

  const _handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const { value } = e.target;

      if (!value) return setActiveItems(allItems.current);

      const results = matchSorter(allItems.current, value, {
        keys: ['label', 'tags'],
        threshold: matchSorter.rankings.ACRONYM,
      });
      setActiveItems(results);
    },
    []
  );

  const handleChange = useMemo(
    () => debounce(_handleChange, 250),
    [_handleChange]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsNavRef = useRef<HTMLElement>(null);
  const noResultsRef = useRef<HTMLHeadingElement>(null);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    const input = inputRef.current;
    if (!input) return;

    /*
      Because of the the debounced change-handler (see `handleChange` above), we need to
      wait 250ms here to ensure that the results are up to date.

      To prevent changes in these 250ms, we temporarily make the input readonly.

      After the wait:
        - "Un-readonly" the input.
        - If there are results, move keyboard-focus to results alpha-nav.
        - If there are no results, have the screen-reader announce that (but keep focus on input).
    */

    input.readOnly = true;

    setTimeout(() => {
      input.readOnly = false;

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
      <Head>
        <title>A-Z Index</title>
      </Head>
      {/*<Intro title={'A-Z Index'} theme={''} intro={<div></div>} />*/}
      <div className={styles['h1Container']}>
        <h1>A-Z Index</h1>
      </div>
      <section className={styles['container']}>
        <div className={styles['search-container']}>
          <h2>Browse the site index</h2>
          <div>
            <form onSubmit={handleSubmit} className={styles['alpha-form']}>
              <TextField
                onChange={handleChange}
                type="search"
                label="Find a site"
                inputRef={inputRef}
                fullWidth
                id="fullWidth"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className={styles.magnifyingGlass}></span>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Button type="submit">Search</Button> */}
            </form>
          </div>

          {activeChars.length > 0 ? (
            <section className={styles['alpha-container']}>
              <nav
                className={styles.alpha}
                ref={resultsNavRef}
                tabIndex={-1}
                aria-label="Results by letter"
              >
                {activeChars.map((char) => {
                  return (
                    <a key={char} href={`#${toDomId(char)}`}>
                      {char}
                    </a>
                  );
                })}
              </nav>
            </section>
          ) : (
            <></>
          )}
        </div>
        <section className={styles.results}>
          {activeChars.length > 0 ? (
            <>
              {activeChars.map((char) => (
                <div
                  key={char}
                  className={styles['letter-group']}
                  id={toDomId(char)}
                >
                  <div className={styles['letter-container']}>
                    <h3 className={styles.letter}>{char}</h3>
                  </div>
                  <ul>
                    {itemsByChar.current ? (
                      itemsByChar.current.get(char)?.flatMap((item: Item) =>
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
                      )
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            /*
                Use assertive so that screen-readers announce "No results found" as soon as possible
                while user is typing in search-box. In the form-submit handler, we also trigger
                a re-announcement if needed (see `handleSubmit` above).
              */

            <div>
              <h3 aria-live="assertive" aria-relevant="all" ref={noResultsRef}>
                {NO_RESULTS}
              </h3>

              {/* Pass along search term with link to search page */}
              <Link
                href={`/search${
                  inputRef.current ? `/${inputRef.current.value}` : ''
                }`}
                className={styles.fancyLink}
              >
                Search all of utk.edu
              </Link>
            </div>
          )}
        </section>
      </section>
      <section className={styles['request-container']}>
        <div className={styles['request-links-container']}>
          <Link
            href="https://communications.utk.edu/a-z-index-update-request/"
            className={styles.fancyLink}
          >
            Request an update to the index
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Alpha;

Alpha.query = gql(`
  query GetAToZ {
    allAToZ(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        id
        title(format: RENDERED)
        aToZFields {
          tags
          url
        }
      }
    }
  }
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, { Page: Alpha, revalidate: 120 });
}
