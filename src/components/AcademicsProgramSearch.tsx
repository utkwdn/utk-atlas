import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

function AosPrograms(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsSearching(true);

    router
      .push(`/academics/programs/search/${searchValue}`)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Wait 500 ms to allow user to finish typing before prefetching
    const timeOutId = setTimeout(() => {
      router
        .prefetch(`/academics/programs/search/${searchValue}`)
        .catch((error) => console.error(error));
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchValue]);

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
            {isSearching ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span style={{ marginLeft: '10px' }}>Searching</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </Button>
        </form>
      </section>
      <div>
        <ul className={styles.linkList}>
          <li>
            <Link href="/academics/programs/degree-type/undergraduate">
              Undergraduate
            </Link>
          </li>
          <li>
            <Link href="/academics/programs/degree-type/graduate">
              Graduate
            </Link>
          </li>
          <li>
            <Link href="/academics/programs/degree-type/online">Online</Link>
          </li>
          <li>
            <Link href="/academics/programs/degree-type/certificate">
              Certificate
            </Link>
          </li>
          <li>
            <Link href="/academics/programs/online/true">Online</Link>
          </li>
          <li>
            <Link href="/academics/programs">All Programs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AosPrograms;
