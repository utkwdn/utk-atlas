import { useState, useRef, useEffect } from 'react';

type AccordionProps = {
  accordionHeading: string;
};
interface KeyboardEvent {
  keyCode: number;
}

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

    setIsExpanded(newState);
    setScrollHeight(newScrollHeight);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      toggleAccordion();
    }
  };

  useEffect(() => {
    // Remove tab index for links inside collapsed accordion
    const accordionLinks = sectionRef.current?.getElementsByTagName('a') || [];
    for (let j = 0; j < accordionLinks.length; j++) {
      accordionLinks[j].tabIndex = isExpanded ? 0 : -1;
    }
  }, [isExpanded]);

  return (
    <div className="wp-block-utk-wds-accordion-panel">
      <h2
        className="utk-wds-accordion__heading"
        data-accordion-heading="true"
        onClick={toggleAccordion}
        onKeyDown={(event) => handleKeyPress(event)}
        tabIndex={0}
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
        {/* Insert accordion body content */}
        {children}
      </section>
    </div>
  );
};
export default Accordion;
