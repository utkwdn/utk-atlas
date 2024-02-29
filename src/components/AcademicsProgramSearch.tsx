import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';

// const Footer: FaustTemplate<FooterToolsQuery> = (props) => {
function AosPrograms(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // prefetching page with search term to speed up load
    router
      .prefetch(`/academics/majors/search/${value}`)
      .catch((error) => console.error(error));
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsSearching(true);

    router
      .push(`/academics/majors/search/${searchValue}`)
      .catch((error) => console.log(error));
  };

  return (
    <section className={styles.searchContainer}>
      <form
        onSubmit={(e) => handleSearchSubmit(e)}
        className={styles.programSearchForm}
      >
        <TextField
          onChange={(e) => handleSearchChange(e.target.value)}
          type="search"
          label="Find a Program"
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
  );
}

export default AosPrograms;
