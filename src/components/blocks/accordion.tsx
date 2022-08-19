import { UtksdsAccordionBlock } from 'client/schema.generated';
// Has Inner Blocks

type AccordionBlockProps = {
  attributes;
};

const Intro: React.FunctionComponent<AccordionBlockProps> = ({
  attributes,
}) => {
  return (
    <div
      className={
        'card ' +
        attributes.textColor +
        ' ' +
        attributes.cardColor.slug +
        ' ' +
        attributes.className
      }
    >
      {/* <InnerBlocks.Content /> */}
    </div>
  );
};
