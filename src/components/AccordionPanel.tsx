import { useState, useEffect } from 'react';
import styles from 'scss/components/Accordion.module.scss';

type AccordionProps = {
  // title: string;
  // theme: string;
  // intro: object;
  // imagesrc: string;
  // alt: string;
  // content: {};
};

const Accordion: React.FunctionComponent<AccordionProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    const newState = isExpanded ? false : true;
    setIsExpanded(newState);
  };

  return (
    <div className="wp-block-utk-wds-accordion-panel">
      <h2
        className="utk-wds-accordion__heading"
        data-accordion-heading="true"
        onClick={toggleAccordion}
      >
        <div aria-expanded={isExpanded ? 'true' : 'false'}>Your Title</div>
      </h2>
      <section
        data-accordion-section="true"
        aria-hidden={isExpanded ? 'false' : 'true'}
      >
        <div className="utk-wds-accordion__panel-body">
          <p>Your Content Here</p>
        </div>
      </section>
    </div>
    // <div className="wp-block-utk-wds-accordion-panel">
    //   <h3 className="utk-wds-accordion__heading" data-accordion-heading="true">
    //     <div
    //       id={`accordion-button-${1}`}
    //       aria-expanded="false"
    //       onClick={() => toggleAccordion(1)}
    //     >
    //       Your Title Here
    //     </div>
    //   </h3>
    //   <section
    //     data-accordion-section="true"
    //     id={`accordion-section-${1}`}
    //     className={`${styles.accordionSection} aria-hidden:hidden overflow-hidden pointer-events-none [&amp;.is-open]:pointer-events-auto`}
    //     aria-hidden="true"
    //     style={{
    //       height: '0px',
    //     }}
    //   >
    //     <div className="utk-wds-accordion__panel-body">
    //       <p>Your content Here</p>
    //     </div>
    //   </section>
    // </div>
  );
};
export default Accordion;
