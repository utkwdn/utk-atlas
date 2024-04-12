import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

function AosPrograms(): JSX.Element {
  const baseUrl = '/academics/programs';
  const anchor = '#filters';

  const [searchValue, setSearchValue] = useState('');
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

    router
      .push(`${baseUrl}/search/${searchValue}${anchor}`)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
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
            <span>Search</span>
          </Button>
        </form>
      </section>
      <div>
        <ul className={styles.linkList}>
          <li>
            <Link href={undergradLink}>Undergraduate</Link>
          </li>
          <li>
            <Link href={gradLink}>Graduate</Link>
          </li>
          <li>
            <Link href={onlineLink}>Online</Link>
          </li>
          <li>
            <Link href={certificateLink}>Certificate</Link>
          </li>
          <li>
            <Link href={`${baseUrl}${anchor}`}>All programs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AosPrograms;
