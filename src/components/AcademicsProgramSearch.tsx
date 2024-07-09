import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  dynamicSrc?: string;
}
function AosPrograms({ dynamicSrc }: Props): JSX.Element {
  const [dmc, setDmc] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const baseUrl = '/academics/programs';
  const anchor = '#filters';
  const searchString = searchValue === '' ? '' : `/search/${searchValue}`;
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    router
      .push(`${baseUrl}/search/${searchValue}${dmc}${anchor}`)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (typeof dynamicSrc === 'string' && dynamicSrc !== '') {
      setDmc(`?dmc=${dynamicSrc}`);
    }
  }, [dynamicSrc]);

  return (
    <div>
      <section className={styles.searchContainer}>
        <form
          onSubmit={(e) => handleSearchSubmit(e)}
          className={styles.programSearchForm}
        >
          <TextField
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            label="Find your program"
            value={searchValue}
            fullWidth
            id="fullWidth"
          />
          <Button type="submit">
            <span>Search</span>
          </Button>
        </form>
      </section>
      <div>
        <ul className={styles.linkList}>
          <li>
            <Link
              href={`${baseUrl}/degree-type/undergraduate${searchString}${dmc}${anchor}`}
            >
              Undergraduate
            </Link>
          </li>
          <li>
            <Link
              href={`${baseUrl}/degree-type/graduate${searchString}${dmc}${anchor}`}
            >
              Graduate
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}/online/true${searchString}${dmc}${anchor}`}>
              Online
            </Link>
          </li>
          <li>
            <Link
              href={`${baseUrl}/degree-type/certificate${searchString}${dmc}${anchor}`}
            >
              Certificate
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}${dmc}${anchor}`}>All programs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AosPrograms;
