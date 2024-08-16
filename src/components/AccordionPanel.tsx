import { useState, useRef } from 'react';

type AccordionProps = {
  accordionHeading: string;
};

const Accordion: React.FunctionComponent<AccordionProps> = ({
  accordionHeading,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    const newState = isExpanded ? false : true;

    const newScrollHeight = isExpanded
      ? 0
      : (sectionRef.current?.scrollHeight as number);
    console.log(newScrollHeight);

    setIsExpanded(newState);
    setScrollHeight(newScrollHeight);
  };

  return (
    <div className="wp-block-utk-wds-accordion-panel">
      <h2
        className="utk-wds-accordion__heading"
        data-accordion-heading="true"
        onClick={toggleAccordion}
      >
        <div aria-expanded={isExpanded ? 'true' : 'false'}>
          {accordionHeading}
        </div>
      </h2>
      <section
        data-accordion-section="true"
        aria-hidden={isExpanded ? 'false' : 'true'}
        style={{
          transition: 'height 400ms',
          height: `${scrollHeight}px`,
        }}
        ref={sectionRef}
      >
        {children}
      </section>
    </div>
  );
};
export default Accordion;
