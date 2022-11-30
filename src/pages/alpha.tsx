import Layout from '../components/Layout';
import styles from 'scss/pages/alpha.module.scss';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';
import Intro from '../components/Intro';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { matchSorter } from 'match-sorter';
import {
  FormEventHandler,
  memo,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FilterOptionsState, UseAutocompleteProps } from '@mui/material';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

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
  !!s.match(upperLetterRegExp);

const digitRegExp = /^\d$/;
const isDigit = (s: string) => !!s.match(digitRegExp);

const toDomId = (char: Character) => (char === '#' ? 'num' : char);

type ItemAutocompleteProps = UseAutocompleteProps<
  Item,
  undefined,
  undefined,
  true
>;

const MemoizedAutocomplete = memo(
  ({ filterOptions, options /* onInputChange */ }: ItemAutocompleteProps) => {
    const router = useRouter();

    return (
      <Autocomplete
        style={{ flexGrow: 1 }}
        options={options}
        renderInput={(params) => <TextField {...params} label="Find a Site" />}
        filterOptions={filterOptions}
        // onInputChange={onInputChange}
        onChange={(_, value) => {
          if (value && typeof value !== 'string') {
            const el = document.getElementById(value.id);
            if (el) {
              // first navigate to item by id
              void router.push(`#${value.id}`);

              // then focus on item's link (for benefit of screen-readers)
              const link = el.querySelector('a');
              if (link) {
                link.focus();
              }
            }
          }
        }}
      />
    );
  }
);
MemoizedAutocomplete.displayName = 'MemoizedAutocomplete';

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

  const activeChars =
    activeItems.length > 0
      ? allChars.current.filter((char) => {
          if (char === '#') {
            return activeItems.some(({ label }) => isDigit(label[0]));
          } else {
            return activeItems.some(({ label }) =>
              label.toUpperCase().startsWith(char)
            );
          }
        })
      : allChars.current;

  const activeItemsRef = useRef(allItems.current);

  const filterOptions = useCallback<
    NonNullable<ItemAutocompleteProps['filterOptions']>
  >((options, { inputValue }) => {
    const results = matchSorter(options, inputValue, { keys: ['label'] });
    activeItemsRef.current = results;
    return results;
  }, []);

  const debouncedSetActiveItems = useMemo(
    () =>
      debounce(() => {
        setActiveItems(activeItemsRef.current);
      }, 250),
    []
  );

  const handleInputChange = useCallback<
    NonNullable<ItemAutocompleteProps['onInputChange']>
  >(() => {
    debouncedSetActiveItems();
  }, [debouncedSetActiveItems]);

  return (
    <Layout>
      {/* TODO: Provide meta/title stuff in Head here */}
      {/* <Head></Head> */}
      <Intro title={'A-Z Index'} theme={''} intro={<div></div>} />
      <section className={styles['container']}>
        <div className={styles['search-container']}>
          <h3>Browse the site index</h3>
          <div>
            <MemoizedAutocomplete
              filterOptions={filterOptions}
              options={allItems.current}
              onInputChange={handleInputChange}
            />
            {/* <input
                className={styles['form-control']}
                type="text"
                list="alphaDataList"
                placeholder="Type to search..."
              />
              <button> Search </button>

              <datalist id="alphaDataList" /> */}
          </div>
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
          <a
            href="https://communications.utk.edu/a-z-index-update-request/"
            className="fancyLink"
          >
            Request an edit
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
                  !activeItems.length ||
                  (activeItems.length > 0 && activeItems.includes(item)) ? (
                    <li
                      key={item.id}
                      id={item.id}
                      className={styles['result-title']}
                    >
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
