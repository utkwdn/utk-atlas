import { AttributesBlock } from 'types/AttributesBlock';
import { UtksdsAccordionBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';
import Accordion from 'react-bootstrap/Accordion';

interface Props {
  attributes: Partial<UtksdsAccordionBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const AccordionBlock = ({ attributes: { className }, innerBlocks }: Props) => (
  /* need a `defaultActiveKey` if a fold should be open on load, which would mean getting the `eventKey` for that AccordionFold */
  <Accordion className={className || ''}>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </Accordion>
);

export default AccordionBlock;
