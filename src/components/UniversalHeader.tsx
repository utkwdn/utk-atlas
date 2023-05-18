import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SearchModalBody from './SearchModalBody';
import SearchModalFooter from './SearchModalFooter';

const UniversalHeader = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleShowSearchModal = () => {
    setShowSearchModal(true);
    // Hide overflow on <html> element to prevent scrolling background instead of modal content
    document.documentElement.style.overflowY = 'hidden';
  };

  const handleHideSearchModal = () => {
    setShowSearchModal(false);
    // Re-enable <html> scrolling
    document.documentElement.style.removeProperty('overflow-y');
  };

  const linkItems = (
    <>
      <li className="uni-nav-item">
        <small>
          <Link
            href="/requestinfo"
            className="menu-item text-light text-uppercase"
          >
            Request Info
          </Link>
        </small>
      </li>
      <li className="uni-nav-item">
        <small>
          <Link href="/visit" className="menu-item text-light text-uppercase">
            Visit
          </Link>
        </small>
      </li>
      <li className="uni-nav-item">
        <small>
          <Link
            href="/admissions"
            className="menu-item text-light text-uppercase"
          >
            Apply
          </Link>
        </small>
      </li>
      {/* Using <a> instead of <Link> for external link to prevent CORS issues with redirects */}
      <li className="uni-nav-item">
        <small>
          <a
            href="https://securelb.imodules.com/s/1341/utaa/form/19/form.aspx?sid=1341&gid=2&pgid=3204&cid=4841&src=giveto"
            className="menu-item text-light text-uppercase"
          >
            Give
          </a>
        </small>
      </li>
    </>
  );

  return (
    <>
      <div id="universal-header">
        <div className="container-xxl">
          <ul className="menu-universal">
            {linkItems}
            <li className="uni-nav-item">
              {' '}
              <button
                type="button"
                // id="btn-searchopen"
                className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed px-0"
                // data-bs-toggle="modal"
                // data-bs-target="#searchModal"
                aria-label="Open search"
                onClick={() => handleShowSearchModal()}
              >
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
                <span>Search</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        show={showSearchModal}
        aria-label="Search dialog"
        className="modal fade"
        fullscreen
        /* explicit escape-handler shouldn't be necessary here but for some reason it is */
        onEscapeKeyDown={() => handleHideSearchModal()}
        /* needs to beat an element on `/meet` page */
        style={{ zIndex: 999999 }}
      >
        <div id="universal-header">
          <div className="container">
            <ul className="menu-universal">
              {linkItems}
              <li className="uni-nav-item">
                <button
                  type="button"
                  className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed px-0"
                  aria-label="Close search"
                  onClick={() => handleHideSearchModal()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    id="searchHeader-close"
                  >
                    <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"></path>
                  </svg>
                  <span>Close</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <SearchModalBody />
        <SearchModalFooter />
      </Modal>
    </>
  );
};

export default UniversalHeader;
