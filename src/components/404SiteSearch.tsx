import { useEffect, useRef, useState } from 'react';

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

const SiteSearch = () => {
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

  const attemptRerender = () => {
    try {
      const { google } = window as typeof window & { google?: Google };
      if (!google) {
        console.error('`window.google` should exist but does not');
        return;
      }
      if (!resultsRef.current) {
        console.error(
          '`resultsRef.current` should be assigned to the search-results div but was not.'
        );
        return;
      }
      google.search.cse.element.render({
        div: resultsRef.current,
        tag: 'searchresults-only',
        gname: GNAME,
      });

      const resultsEl = google.search.cse.element.getElement(GNAME);
      if (value) {
        resultsEl.execute(value);
      } else {
        resultsEl.clearAllResults();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        className="form-inline hidden-print mt-4"
        id="cse-searchbox-form"
        onSubmit={(e) => {
          e.preventDefault();

          try {
            const { google } = window as typeof window & { google?: Google };
            if (!google) {
              console.error('`window.google` should exist but does not');
              return;
            }

            const resultsEl = google.search.cse.element.getElement(GNAME);

            if (!resultsEl) {
              attemptRerender();
            } else {
              if (value) {
                resultsEl.execute(value);
              } else {
                resultsEl.clearAllResults();
              }
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <div className="mb-3 input-group">
          <label className="sr-only visually-hidden" htmlFor="q">
            Search
          </label>
          <input
            onChange={(e) => setValue(e.target.value)}
            type="search"
            className="form-control left-border"
            title="Search utk.edu"
            placeholder="Example: Apply, Payroll, Provost, English Department"
            name="q"
            id="q"
          />
          <button type="submit" className="btn btn-utsearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-search"
              aria-hidden="true"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>{' '}
            <span className="text-white">Search</span>
          </button>
        </div>
      </form>

      <div ref={resultsRef} />
    </div>
  );
};

export default SiteSearch;
