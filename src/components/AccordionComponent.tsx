import { useState, useEffect } from 'react';
import styles from 'scss/components/Accordion.module.scss';

type IntroProps = {
  // title: string;
  // theme: string;
  // intro: object;
  // imagesrc: string;
  // alt: string;
  content: {
    attribs: any;
    children: any;
    name: any;
  };
};

/** Intro component created to be able to easily swap out the main intro chunk of content for a page.
 * Contains:
 * – demphasized H1 {title}
 * – emphasized <p> {theme} (main message/title for the page treated visually like an H1)
 * – flexible {intro} sub-section that contains supporting graphic/video/etc (currently html added in each instance)
 * (eventually envision {intro} using other swappable or nested components to add flexibility of content type used in this space – but these need to be identified and created. TBD)
 */

const Accordion: React.FunctionComponent<IntroProps> = ({ content }) => {
  console.log(content.attribs);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleAccordion = (accordionId: number) => {
    const accordionTarget = document.getElementById(
      `accordion-section-${accordionId}`
    );
    const accordionButtonTarget = document.getElementById(
      `accordion-button-${accordionId}`
    );

    if (accordionTarget && accordionButtonTarget && !isTransitioning) {
      const isExpanded = accordionTarget.classList.contains('is-open');

      if (isExpanded) {
        accordionTarget.classList.remove('is-open');
        accordionTarget.setAttribute('aria-hidden', 'true');
        accordionButtonTarget.setAttribute('aria-expanded', 'false');
        // accordionTarget.style.height = `${accordionTarget.scrollHeight}px`;
        accordionTarget.style.height = '0px';
      } else {
        accordionTarget.classList.add('is-open');
        accordionTarget.setAttribute('aria-hidden', 'false');
        accordionButtonTarget?.setAttribute('aria-expanded', 'true');
        accordionTarget.style.height = `${accordionTarget.scrollHeight}px`;
      }
    }
  };

  return (
    <div
      className="wp-block-group utkwds-accordion-group has-light-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained"
      style={{
        paddingTop: 'var(--wp--preset--spacing--60)',
        paddingBottom: 'var(--wp--preset--spacing--60)',
      }}
    >
      <div className="wp-block-utk-wds-accordion">
        <div
          data-accordion="true"
          className="utk-wds-accordion-wrapper"
          data-color-scheme="medium"
        >
          <div className="wp-block-utk-wds-accordion-panel">
            <h3
              className="utk-wds-accordion__heading"
              data-accordion-heading="true"
            >
              <div
                id={`accordion-button-${1}`}
                aria-expanded="false"
                onClick={() => toggleAccordion(1)}
              >
                Accounting careers
              </div>
            </h3>
            <section
              data-accordion-section="true"
              id={`accordion-section-${1}`}
              className={`${styles.accordionSection} aria-hidden:hidden overflow-hidden pointer-events-none [&amp;.is-open]:pointer-events-auto`}
              aria-hidden="true"
              style={{
                height: '0px',
              }}
            >
              <div className="utk-wds-accordion__panel-body">
                <ul className="no-disc">
                  <li>Budget analysis</li>
                  <li>Environmental auditing</li>
                  <li>Financial reporting</li>
                  <li>Information technology</li>
                  <li>Litigation and risk management consulting</li>
                  <li>Money handling&nbsp;</li>
                  <li>Personal financial planning</li>
                  <li>Record keeping</li>
                  <li>Tax planning</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="wp-block-utk-wds-accordion-panel">
            <h3
              className="utk-wds-accordion__heading"
              data-accordion-heading="true"
            >
              <div
                id={`accordion-button-${2}`}
                aria-expanded="false"
                onClick={() => toggleAccordion(2)}
              >
                Business analytics careers
              </div>
            </h3>
            <section
              data-accordion-section="true"
              id={`accordion-section-${2}`}
              className="aria-hidden:hidden overflow-hidden pointer-events-none [&amp;.is-open]:pointer-events-auto is-open"
              aria-hidden="true"
              style={{
                height: '0px',
                transition: 'height 400ms',
              }}
            >
              <div className="utk-wds-accordion__panel-body">
                <ul className="no-disc">
                  <li>Branch management</li>
                  <li>Data collection/data mining</li>
                  <li>Decision analysis and modeling</li>
                  <li>Fraud detection</li>
                  <li>Investment banking</li>
                  <li>Mergers and acquisitions</li>
                  <li>Operations management</li>
                  <li>Process optimization</li>
                  <li>Top management</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
