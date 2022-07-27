import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SearchModalBody from './SearchModalBody';
import SearchModalFooter from './SearchModalFooter';

const UniversalHeader = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const linkItems = [
    {
      label: 'Request Info',
      href: '/requestinfo',
    },
    {
      label: 'Visit',
      href: '/visit',
    },
    {
      label: 'Apply',
      href: '/apply',
    },
    {
      label: 'Give',
      href: '/give',
    },
  ].map(({ label, href }, i) => (
    <li className="col-auto" key={i}>
      <small>
        <Link href={href}>
          <a className="nav-link px-0 text-light text-uppercase">{label}</a>
        </Link>
      </small>
    </li>
  ));

  return (
    <>
      <div id="universal-header">
        <div className="container-xxl">
          <ul className="row justify-content-end list-inline mb-0">
            {linkItems}
            <li className="col-auto">
              {' '}
              <button
                type="button"
                // id="btn-searchopen"
                className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed px-0"
                // data-bs-toggle="modal"
                // data-bs-target="#searchModal"
                aria-label="Open search"
                onClick={() => setShowSearchModal(true)}
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
        onEscapeKeyDown={() => setShowSearchModal(false)}
      >
        <div id="universal-header">
          <div className="container">
            <ul className="row justify-content-end list-inline mb-0">
              {linkItems}
              <li className="col-auto">
                <button
                  type="button"
                  className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed"
                  aria-label="Close search"
                  onClick={() => setShowSearchModal(false)}
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
