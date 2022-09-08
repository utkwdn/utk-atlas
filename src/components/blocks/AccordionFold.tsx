import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsAccordionFoldBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';
import Accordion from 'react-bootstrap/Accordion';

export interface Props {
  attributes: Partial<UtkwdsAccordionFoldBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

/*
  TODO: I think the `show` boolean determines whether the fold should be open
  on page-load. In this implementation, that information would actually have to
  travel "up" to the parent Accordion component, whose `defaultActiveKey` prop
  should be set to the open-panel's `foldSlug` (used as `eventKey` here).
  Not sure how to handle that yet. For now, I'm leaving in the unused
  `attributes` below (though I *think* only `show` will be needed).
*/

const AccordionFoldBlock = ({
  attributes: {
    className,
    collapseS,
    foldSlug,
    foldName,
    show,
    showS,
    parentID,
  },
  innerBlocks,
}: Props) => {
  if (!foldSlug) {
    console.error(
      'An AccordionFold is missing a `foldSlug`. Skipping it because all AccordionFolds must have a unique `foldSlug` to use for the `eventKey` prop.'
    );
    return <></>;
  }

  if (!foldName) {
    console.error(
      'An AccordionFold is missing a `foldName` (header text). Still rendering it, but this should be addressed.'
    );
  }

  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'An AccordionFold has no (or an empty) `innerBlocks` array. Still rendering, but this should be addressed.'
    );
  }

  return (
    <Accordion.Item eventKey={foldSlug} className={className || ''}>
      <Accordion.Header>{foldName || ''}</Accordion.Header>
      <Accordion.Body>
        {!!innerBlocks?.length &&
          innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionFoldBlock;
