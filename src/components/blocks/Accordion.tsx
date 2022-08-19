import { UtksdsAccordionBlock } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: UtksdsAccordionBlock;
  innerBlocks?: Partial<Block>[];
}

const AccordionBlock = ({
  attributes: { className, accordionID, InnerBlocks },
}: Props) => (
  <div
    className={`${accordion || ''} ${className || ''} `}
    id={'${accordionID'}
  >
    <InnerBlocks.Content />
  </div>
);

export default AccordionBlock;
