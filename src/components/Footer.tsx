import React from 'react';
// import styles from 'scss/components/Footer.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';

interface Props {
  copyrightHolder?: string;
}

function Footer({ copyrightHolder = 'Company Name' }: Props): JSX.Element {
  const year = new Date().getFullYear();

  const { menuItems } = client.useQuery()
  const tools = menuItems({
    where: { location: MenuLocationEnum.TOOLS },
  }).nodes;
  const links = menuItems({
    where: { location: MenuLocationEnum.LINKS },
  }).nodes;

  return (

    <footer id="colophon" className="site-footer  mt-auto">
    <div className="container-fluid universal-footer" id="universal-footer">
        <div className="container-xxl">
          <div className="row pt-3">
            <div className="site-info col-12 col-md-7 col-lg-8">
              <div className="col-auto">
                <div className="row">
                      <div className="col-6">
          <h4 className="text-white">Tools</h4>
			<ul id="list-unstyled" className="list-unstyled">
            {tools?.map((tool) => (
              <li key={`${tool.label}$-menu`}>
                <Link href={tool.url ?? ''}>
                  <a className="text-white footer-links" href={tool.url}>{tool.label}</a>
                </Link>
              </li>
            ))}
          </ul>
          </div>
          <div className="col-6">
          <h4 className="text-white">Campus Links</h4>
            <ul className="list-unstyled">
			{links?.map((link) => (
              <li key={`${link.label}$-menu`}>
                <Link href={link.url ?? ''}>
                  <a className="text-white footer-links" href={link.url}>{link.label}</a>
                </Link>
              </li>
            ))}
            </ul>
          </div>

                </div>
              </div>
              <div className="row row-cols-2 row-cols-sm-4 row-cols-md-2 row-cols-lg-4 g-2  py-5">
                <a className="btn  btn-link btn-sm text-start col twitter text-white footer-links" href="http://twitter.com/utknoxville"><svg fill="currentColor"  width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm18.862 9.237c.208 4.617-3.235 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.079-4.03 3.198-4.03.944 0 1.797.398 2.396 1.037.748-.147 1.451-.42 2.085-.796-.245.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.44.656-.997 1.234-1.638 1.697z"></path></svg> <span className="">Twitter</span></a><a className="btn  btn-link btn-sm text-start col facebook text-white footer-links" href="http://facebook.com/utknoxville"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm16 7h-1.923c-.616 0-1.077.252-1.077.889v1.111h3l-.239 3h-2.761v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"></path></svg> <span className="">Facebook</span></a><a className="btn  btn-link btn-sm text-start col youtube text-white footer-links" href="https://www.youtube.com/user/UniversityTennessee"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 9.333l5.333 2.662-5.333 2.672v-5.334zm14-9.333v24h-24v-24h24zm-4 12c-.02-4.123-.323-5.7-2.923-5.877-2.403-.164-7.754-.163-10.153 0-2.598.177-2.904 1.747-2.924 5.877.02 4.123.323 5.7 2.923 5.877 2.399.163 7.75.164 10.153 0 2.598-.177 2.904-1.747 2.924-5.877z"></path></svg> <span className="">YouTube</span></a><a className="btn  btn-link btn-sm text-start col instagram text-white footer-links" href="http://instagram.com/utknoxville"><svg fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg> <span className="">Instagram</span></a>
              </div>
        </div>

        <div className="utk-identifier col-12 col-md-5 col-lg-4 ms-lg-auto mt-md-n5 p-4">
          <a className="mb-4 d-block"
            href="/">
            <img src="/images/chrome/logo-horizontal-left-white.svg" alt="University of Tennessee, Knoxville" />
          </a>

          <p className="text-white small">The University of Tennessee<br />Knoxville, Tennessee 37996<br />865-974-1000</p>
          <p className="text-white small">The flagship campus of the <a href="https://tennessee.edu/" target="_blank" rel="noreferrer" className="text-white footer-links">University of Tennessee System</a> and partner in the <a href="https://www.tntransferpathway.org/" target="_blank" rel="noreferrer" className="text-white footer-links">Tennessee Transfer Pathway</a>.</p>
          <p className="text-white small"><a className="text-white me-3 footer-links" href="https://oed.utk.edu/ada/">ADA</a> <a className="text-white me-3 footer-links" href="/about/privacy/">Privacy</a> <a className="text-white me-3 footer-links" href="https://safety.utk.edu/">Safety</a> <a className="text-white footer-links" href="https://titleix.utk.edu/">Title&nbsp;IX</a>  </p>
        </div>
        </div>
      </div>
    </div>




      <script src="//images.utk.edu/designsystem/v1/0.0.9/assets/js/utk.js" id="utk-bootstrap-designsytemscripts-js"></script>
      <script async src="https://cse.google.com/cse.js?cx=da48cf0836de1c946"></script>
    </footer>

  );
}

export default Footer;
