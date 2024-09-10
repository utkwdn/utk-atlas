import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  dynamicSrc?: string;
  commentString: string;
}
interface AosData {
  aos: string;
}

function AosPrograms({ dynamicSrc, commentString }: Props): JSX.Element {
  const [dmc, setDmc] = useState('');
  const [aos, setAos] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const baseUrl = '/academics/programs';
  const anchor = '#filters';
  const searchString = searchValue === '' ? '' : `/search/${searchValue}`;
  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    router
      .push(`${baseUrl}/search/${searchValue}${dmc}${aos}${anchor}`)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (typeof dynamicSrc === 'string' && dynamicSrc !== '') {
      setDmc(`?dmc=${dynamicSrc}`);
    }

    let areaOfStudy;
    const hasData = commentString.match(/\{(.*?)\}/);

    if (hasData) {
      const aosObject = JSON.parse(hasData[0]) as AosData;
      areaOfStudy = aosObject.aos;
      setAos(`/area-of-study/${areaOfStudy}`);
    }
  }, [dynamicSrc, commentString]);

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
              href={`${baseUrl}/degree-type/undergraduate${searchString}${dmc}${aos}${anchor}`}
            >
              Undergraduate
            </Link>
          </li>
          <li>
            <Link
              href={`${baseUrl}/degree-type/graduate${searchString}${dmc}${aos}${anchor}`}
            >
              Graduate
            </Link>
          </li>
          <li>
            <Link
              href={`${baseUrl}/online/true${searchString}${dmc}${aos}${anchor}`}
            >
              Online
            </Link>
          </li>
          <li>
            <Link
              href={`${baseUrl}/degree-type/certificate${searchString}${dmc}${aos}${anchor}`}
            >
              Certificate
            </Link>
          </li>
          <li>
            <Link href={`${baseUrl}${dmc}${aos}${anchor}`}>All programs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AosPrograms;
