import React from 'react';
import SlateFormEmbed from '../SlateFormEmbed';
import Modal from 'react-bootstrap/Modal';
import style from 'scss/components/HeroCTA.module.scss';
import { useState } from 'react';

interface Props {
  dynamicSrc: string;
}

function CTA({ dynamicSrc }: Props): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const appendDynamicSrc = (linkAddress: string) => {
    const isInternal =
      linkAddress &&
      (linkAddress.startsWith('https://www.utk.edu') ||
        linkAddress.startsWith('https://utk.edu') ||
        linkAddress.startsWith('/'));
    const dynamicSrcIsSet = typeof dynamicSrc === 'string' && dynamicSrc !== '';

    if (isInternal && dynamicSrcIsSet) {
      return linkAddress + `?dmc=${dynamicSrc}`;
    } else {
      return linkAddress;
    }
  };

  const whyApply = () => {
    return (
      <>
        <p>
          <a
            onClick={handleShow}
            className="subLink pointer-event-visible  cursor-pointer"
          >
            Learn more about the December 16 application deadline
          </a>
        </p>
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h3 className="mt-0">Fall Deadline</h3>
              <p>
                If you&apos;re a high school senior who would like to be a Vol
                in fall 2025, the application deadline is December 16. When you
                apply, you&apos;ll be automatically considered for institutional
                scholarships.
              </p>
              <div className="fancyLinkGroup ch-md is-layout-flow">
                <p className="fancyLink stack-links">
                  <a
                    href={appendDynamicSrc('https://admissions.utk.edu/')}
                    className="hero-cat"
                  >
                    Apply today
                  </a>
                </p>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  };

  return (
    <div className="ctaHolder">
      {/* BEGIN DYNAMIC CONTENT */}
      {dynamicSrc === 'awareness' ? (
        <>
          {/* 'awareness' content */}
          <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0">
            <span className="text-condensed text-letterspaced fst-italic fs-2 italic-leading">
              Welcome to
            </span>
            <br />
            Rocky Top
          </h2>

          <div className="slate-squeeze mb-3">
            <p className="fancyLink stack-links">
              <a href="https://admissions.utk.edu" className="hero-cat">
                Apply today
              </a>
            </p>
            <p style={{ maxWidth: 'none' }}>
              There&apos;s something for everyone at UT. We can&apos;t wait for
              you to call our campus home sweet home! Get a free sticker when
              you request info!
            </p>

            {/* Why Apply Link & Modal */}
            {whyApply()}

            <SlateFormEmbed
              id="3efe2258-fe6c-4e5e-a198-faf90c1a3634"
              scriptSrc={
                `https://govols.utk.edu/register/?id=3efe2258-fe6c-4e5e-a198-faf90c1a3634&output=embed&div=form_3efe2258-fe6c-4e5e-a198-faf90c1a3634` +
                (location.search.length > 1
                  ? '&' + location.search.substring(1)
                  : '')
              }
            />
          </div>
        </>
      ) : dynamicSrc === 'meet' ? (
        <>
          {/* 'meet' content */}
          {/* <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0"> */}
          <h2
            className={`${style['meet-cta']} text-uppercase display-3 mt-md-3 mt-lg-0`}
          >
            <span className="text-condensed text-letterspaced fst-italic fs-2 italic-leading">
              Welcome to
            </span>
            <br />
            Rocky Top
          </h2>
          <div className="slate-squeeze mb-3">
            <p style={{ maxWidth: 'none' }}>
              UT is home to the Volunteers: people who use their talent,
              creativity, and knowledge to shape a better future.
            </p>
            <p style={{ maxWidth: 'none' }}>
              Tell us about yourself and get a free sticker!
            </p>
            <SlateFormEmbed
              id="d9a5c913-3050-4fed-9a75-04aee3bdbed7"
              scriptSrc={
                `https://govols.utk.edu/register/?id=d9a5c913-3050-4fed-9a75-04aee3bdbed7&output=embed&div=form_d9a5c913-3050-4fed-9a75-04aee3bdbed7` +
                (location.search.length > 1
                  ? '&' + location.search.substring(1)
                  : '')
              }
            />
          </div>
        </>
      ) : (
        <>
          {/* Default content */}
          <h2 className="text-uppercase display-3 mt-md-3 mt-lg-0">
            <span className="text-condensed text-letterspaced fst-italic fs-2 italic-leading">
              Welcome to
            </span>
            <br />
            Rocky Top
          </h2>
          <div className="fancyLinkGroup ch-md is-layout-flow">
            {/* <p className="fancyLink stack-links">
                    <a href="https://www.utk.edu/visit" className="hero-cat">
                      Schedule a visit
                    </a>
                  </p> */}

            <p className="fancyLink stack-links">
              <a href="https://admissions.utk.edu" className="hero-cat">
                Apply today
              </a>
            </p>

            <p className="fancyLink stack-links">
              <a
                href={appendDynamicSrc('https://utk.edu/requestinfo')}
                className="hero-cat"
              >
                Request more info
              </a>
            </p>
          </div>
          <p>
            There&apos;s something for everyone at UT. We can&apos;t wait for
            you to call our campus home sweet home!
          </p>

          {/* Why Apply Link & Modal */}
          {whyApply()}
        </>
      )}

      {/* Confirm Enrollment Link */}
      {/* <h3 className="subCta">Admitted to UT?</h3>
            <a
              href="https://admissions.utk.edu/confirm/"
              className="subLink  pointer-event-visible"
              // orange underline
              // className="subLink text-decoration-none link-underline  pointer-event-visible"
            >
              Confirm enrollment now
            </a> */}
      {/* End Confirm Enrollment Link */}
    </div>
  );
}

export default CTA;
