import { UtksdsAccordionBlockAttributes, Block } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: UtksdsAccordionBlockAttributes;
  innerBlocks?: Partial<Block>[];
}

const AccordionBlock = ({
  attributes: { className, accordionID },
  innerBlocks,
}: Props) => (
  // eventually use React-Bootstrap Accordion, probably
  <div
    className={`accordion ${className}`}
    {...(accordionID ? { id: accordionID } : {})}
  >
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </div>
);

export default AccordionBlock;
