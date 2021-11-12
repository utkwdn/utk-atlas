import React from 'react';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';

interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = 'Headless by WP Engine',
  description,
}: Props): JSX.Element {
  const { menuItems } = client.useQuery()
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  return (
    <>
    <nav id="universal-header">
        <div className="container-xxl">
        <ul className="row justify-content-end list-inline mb-0">
          <li className="col-auto"><small><a href="https://www.utk.edu/requestinfo/" className="nav-link px-0 text-light text-uppercase">Request Info</a></small></li>
          <li className="col-auto"><small><a href="https://www.utk.edu/visit/" className="nav-link px-0 text-light text-uppercase">Visit</a></small></li>
          <li className="col-auto"><small><a href="https://www.utk.edu/apply/" className="nav-link px-0 text-light text-uppercase">Apply</a></small></li>
          <li className="col-auto"><small><a href="https://www.utk.edu/give/" className="nav-link px-0 text-light text-uppercase">Give</a></small></li>
         <li className="col-auto"> <button type="button" id="btn-searchopen" className="btn btn-search text-uppercase text-light navbar-toggler col-auto collapsed px-0" data-bs-toggle="modal" data-bs-target="#searchModal" aria-label="Toggle search"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" id="searchHeader-open"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"></path></svg>
         <span>Search</span></button></li>
        </ul>
        </div>
      </nav>

      <header id="masthead" className="site-header">
        <div className="container-xxl">
          <div className="row justify-content-between py-3 py-md-4 py-lg-0">
      <div className="col-5 col-sm-7 col-md-8 col-lg-2 col-xl-3">
          <a href="/" className="d-grid h-100">logo</a>
      </div>

      <button className="navbar-toggler col-auto mr-auto" type="button" id="mobile-menu-open" data-toggle="#site-navigation"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"></path></svg><span className="visually-hidden">Menu</span></button>



      <nav id="site-navigation" className="navbar-horizontal col-auto g-0">
        <button className="navbar-toggler" type="button" id="mobile-menu-close" data-toggle="collapse" data-target="#site-navigation" aria-controls="site-navigation" aria-expanded="false" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg><span className="visually-hidden">Close Menu</span>
        </button>
        <div className="menu-main-site-container">
          <ul id="primary-menu" className="list-unstyled">
            <li><a className="main-navigation" href="/aboutut/">About UT</a></li>
            <li><a className="main-navigation" href="/academics/">Academics</a></li>
            <li><a className="main-navigation" href="/admissions/">Admissions</a></li>
            <li><a className="main-navigation" href="/">Diversity</a></li>
            <li><a className="main-navigation" href="/outreach/">Outreach</a></li>
            <li ><a className="main-navigation" href="/research/">Research</a></li>
          </ul>
        </div>
      </nav>
      </div></div></header>
      </>
  );
}

export default Header;
