import { useEffect, useRef, useState, FormEvent } from 'react';

/*
  See https://developers.google.com/custom-search/docs/element#cse-element
  for all this Google CSE stuff. Just typing what we need in a bare-bones way here.
*/

interface ComponentConfig {
  div: string | HTMLDivElement;
  tag: 'search' | 'searchbox' | 'searchbox-only' | 'searchresults-only';
  gname?: string;
  attributes?: Record<string, unknown>;
}

interface CSEElement {
  clearAllResults: () => void;
  execute: (value: string) => void;
}

interface Props {
  searchTerm?: string;
}

interface Google {
  search: {
    cse: {
      element: {
        render: (
          componentConfig: ComponentConfig,
          opt_componentConfig?: ComponentConfig
        ) => void;
        getElement: (gname: string) => CSEElement;
      };
    };
  };
}

const GNAME = 'this-site-results';

const SiteSearch = ({ searchTerm }: Props) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  /*
    The relevant `cse.google...` script is loaded in `_app.tsx`, and so
    all the `window.google` stuff *should* be ready to go.
    However, we need to manually set it up to work with the empty
    results `div` at the very bottom of this component (because this
    component mounts and unmounts with the Search modal, and therefore the
    3rd-party script won't find it when it initializes on page-load).
    That manual configuration needs to happen every time this component mounts,
    so we use an empty dependency array in this `useEffect()`.
  */
  useEffect(() => {
    if (!resultsRef.current) {
      console.error(
        '`resultsRef.current` should be assigned to the search-results div but was not.'
      );
      return;
    }

    try {
      const { google } = window as typeof window & { google?: Google };
      if (!google) {
        console.error('`window.google` should exist but does not');
        return;
      }

      // this is what sets up the results `div` at the bottom of this component
      google.search.cse.element.render({
        div: resultsRef.current,
        tag: 'searchresults-only',
        gname: GNAME,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setValue(searchTerm);
      handleGoogleSearch(searchTerm);
    }
  }, [searchTerm]);

  const handleGoogleSearch = (searchQuery?: string) => {
    try {
      const { google } = window as typeof window & { google?: Google };
      if (!google) {
        console.error('`window.google` should exist but does not');
        return;
      }

      const resultsEl = google.search.cse.element.getElement(GNAME);

      if (!resultsEl) {
        console.error(
          `The Google CSE library could not find the element with gname ${GNAME}`
        );
        return;
      }
      if (searchQuery) {
        resultsEl.execute(searchQuery);
      } else if (value) {
        console.log('handling google search');
        resultsEl.execute(value);
      } else {
        console.log(typeof value);
        resultsEl.clearAllResults();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGoogleSearch();
  };

  return (
    <div>
      <form
        className="form-inline hidden-print mt-4"
        id="cse-searchbox-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-3 input-group">
          <label className="sr-only visually-hidden" htmlFor="q">
            Search
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="search"
            className="form-control left-border"
            title="Search utk.edu"
            placeholder="Example: Apply, Payroll, Provost, English Department"
            name="q"
            id="q"
            autoFocus
          />

          <button type="submit" className="btn btn-utsearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              id="searchHeader-open"
            >
              <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path>
            </svg>
            <span className="text-uppercase">Search</span>
          </button>
        </div>
      </form>

      <div ref={resultsRef} />
    </div>
  );
};

export default SiteSearch;
