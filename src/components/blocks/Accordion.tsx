import {
  Block,
  UtkwdsAccordionBlockAttributes,
  UtkwdsAccordionFoldBlockAttributes,
} from 'client';
import BlockRouter from 'components/BlockRouter';
import Accordion from 'react-bootstrap/Accordion';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';

interface Props {
  attributes: Partial<UtkwdsAccordionBlockAttributes>;
  /** Should only be `'utkwds/accordion-fold'` blocks. */
  innerBlocks?: InnerAttributesBlock<UtkwdsAccordionFoldBlockAttributes>[];
}

const AccordionBlock = ({ attributes: { className }, innerBlocks }: Props) => {
  const defaultActiveKey: string[] = [];

  const accordionFolds = innerBlocks
    ? innerBlocks.flatMap((block, i) => {
        if (block.name !== 'utkwds/accordion-fold') {
          console.error(
            'An inner-block of an `Accordion` block is not an `AccordionFold` block (has the wrong `name`). Skipping this inner-block.'
          );
          return [];
        }

        if (!block.innerBlocks || !block.innerBlocks.length) {
          console.error(
            'An `AccordionFold` block has a missing or empty `innerBlocks`. Skipping this block.'
          );
          return [];
        }

        // not sure if this is necessary
        const attributes =
          block.attributes ||
          (JSON.parse(
            block.attributesJSON || '{}'
          ) as UtkwdsAccordionFoldBlockAttributes);

        if (!attributes.foldName) {
          console.error(
            'An AccordionFold is missing a `foldName` attribute, which is required. Skipping this block.'
          );
          return [];
        }

        const eventKey = attributes.foldSlug || `${i}`;

        if (attributes.show) {
          defaultActiveKey.push(eventKey);
        }

        return (
          <Accordion.Item
            eventKey={eventKey}
            className={attributes.className || ''}
          >
            <Accordion.Header>{attributes.foldName}</Accordion.Header>
            <Accordion.Body>
              {block.innerBlocks.map((block, i) => (
                <BlockRouter block={block as Block} key={i} />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        );
      })
    : undefined;

  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'An `Accordion` block has a missing `innerBlocks` or an `innerBlocks` with no `AccordionFold`-block children. Skipping this `Accordion` block.'
    );
    return <></>;
  }

  return (
    <Accordion
      className={className || ''}
      {...(defaultActiveKey.length ? { defaultActiveKey } : {})}
      /* if more than one AccordionFold defaults to open, must *allow* for it with `alwaysOpen` */
      {...(defaultActiveKey.length > 1 ? { alwaysOpen: true } : {})}
    >
      {accordionFolds}
    </Accordion>
  );
};

export default AccordionBlock;
