import React from 'react';
import styles from 'scss/components/ProgramSearch.module.scss';
import { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

// const Footer: FaustTemplate<FooterToolsQuery> = (props) => {
function AosPrograms(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

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
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          label="Find a Program"
          value={searchValue}
          fullWidth
          id="fullWidth"
        />
        <Button type="submit">Search</Button>
      </form>
    </section>
  );
}

export default AosPrograms;
