import { useEffect, useRef } from 'react';

interface CSEElement {
  clearAllResults: () => void;
  execute: (value: string) => void;
}

const SiteSearch = () => {
  const thisSiteInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=da48cf0836de1c946';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  });

  return (
    <div>
      <form
        className="form-inline hidden-print mt-4"
        id="cse-searchbox-form"
        onSubmit={(e) => {
          e.preventDefault();

          const input = thisSiteInputRef.current;

          let googleResultsEl: CSEElement;

          try {
            googleResultsEl = (
              window as any
            ).google.search.cse.element.getElement(
              'this-site-results'
            ) as CSEElement;

            if (!googleResultsEl) {
              console.error(
                'The Google CSE library could not find the `[data-gname="this-site-results"]` element'
              );
              return;
            } else {
              if (input && input.value) {
                googleResultsEl.execute(input.value);
              } else {
                googleResultsEl.clearAllResults();
              }
            }
          } catch (err) {
            console.log(
              'Problem with `window.google.search.cse.element.getElement()` call:'
            );
            console.error(err);
          }
        }}
      >
        <div className="mb-3 input-group">
          <label className="sr-only visually-hidden" htmlFor="q">
            Search
          </label>
          <input
            ref={thisSiteInputRef}
            type="search"
            className="form-control"
            title="Search utk.edu"
            placeholder="Example: Apply, Payroll, Provost, English Department"
            name="q"
            id="q"
          />
          <button type="submit" className="btn btn-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              aria-hidden="true"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>{' '}
            <span className="visually-hidden">Search</span>
          </button>
        </div>
      </form>

      <div
        className="gcse-searchresults-only"
        data-gname="this-site-results"
        data-enableImageSearch="false"
        data-enableOrderBy="false"
      ></div>
    </div>
  );
};

export default SiteSearch;
