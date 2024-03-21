import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

function AosPrograms(): JSX.Element {
  const baseUrl = '/academics/programs';
  const anchor = '#filters';

  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [undergradLink, setUndergradLink] = useState(
    `${baseUrl}/degree-type/undergraduate${anchor}`
  );
  const [gradLink, setGradLink] = useState(
    `${baseUrl}/degree-type/graduate${anchor}`
  );
  const [onlineLink, setOnlineLink] = useState(
    `${baseUrl}/online/true${anchor}`
  );
  const [certificateLink, setCertificateLink] = useState(
    `${baseUrl}/degree-type/certificate${anchor}`
  );

  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsSearching(true);

    router
      .push(`${baseUrl}/search/${searchValue}${anchor}`)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Wait 500 ms to allow user to finish typing before prefetching
    const timeOutId = setTimeout(() => {
      router
        .prefetch(`${baseUrl}/search/${searchValue}${anchor}`)
        .catch((error) => console.error(error));
    }, 500);

    // Add search query to sub-search links
    if (searchValue !== '') {
      setUndergradLink(
        `${baseUrl}/degree-type/undergraduate/search/${searchValue}${anchor}`
      );
      setGradLink(
        `${baseUrl}/degree-type/graduate/search/${searchValue}${anchor}`
      );
      setOnlineLink(`${baseUrl}/online/true/search/${searchValue}${anchor}`);
      setCertificateLink(
        `${baseUrl}/degree-type/certificate/search/${searchValue}${anchor}`
      );
    }

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
            <Link href={undergradLink} onClick={() => setIsSearching(true)}>
              Undergraduate
            </Link>
          </li>
          <li>
            <Link href={gradLink} onClick={() => setIsSearching(true)}>
              Graduate
            </Link>
          </li>
          <li>
            <Link href={onlineLink} onClick={() => setIsSearching(true)}>
              Online
            </Link>
          </li>
          <li>
            <Link href={certificateLink} onClick={() => setIsSearching(true)}>
              Certificate
            </Link>
          </li>
          <li>
            <Link
              href={`${baseUrl}${anchor}`}
              onClick={() => setIsSearching(true)}
            >
              All programs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AosPrograms;
