import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {
  Block,
  UtkwdsTabBlockAttributes,
  UtkwdsTabsBlockAttributes,
} from 'client';
import BlockRouter from 'components/BlockRouter';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';

interface Props {
  attributes: Partial<UtkwdsTabsBlockAttributes>;
  /** Should only be `'utkwds/tab'` blocks. */
  innerBlocks?: InnerAttributesBlock<UtkwdsTabBlockAttributes>[];
}

const TabsBlock = ({ attributes: { className }, innerBlocks }: Props) => {
  let defaultActiveKey: string | undefined;

  const tabBlocks = innerBlocks
    ? innerBlocks.flatMap((block, i) => {
        if (block.name !== 'utkwds/tab') {
          console.error(
            'An inner-block of a `Tabs` block is not a `Tab` block (has the wrong `name`). Skipping this inner-block.'
          );
          return [];
        }

        if (!block.innerBlocks || !block.innerBlocks.length) {
          console.error(
            'A `Tab` block has a missing or empty `innerBlocks`. Skipping this block.'
          );
          return [];
        }

        // not sure if this is necessary
        const attributes =
          block.attributes ||
          (JSON.parse(
            block.attributesJSON || '{}'
          ) as UtkwdsTabBlockAttributes);

        if (!attributes.tabName) {
          console.error(
            'A `Tab` block is missing a `tabName` attribute, which is required. Skipping this block.'
          );
          return [];
        }

        const eventKey = attributes.tabSlug || `${i}`;

        if (!defaultActiveKey && attributes.tabActive) {
          defaultActiveKey = eventKey;
        }

        return (
          <Tab title={attributes.tabName} eventKey={eventKey}>
            {block.innerBlocks.map((block, i) => (
              <BlockRouter block={block as Block} key={i} />
            ))}
          </Tab>
        );
      })
    : undefined;

  if (!tabBlocks || !tabBlocks.length) {
    console.error(
      'A `Tabs` block has a missing `innerBlocks` or an `innerBlocks` with no `Tab`-block children. Skipping this `Tabs` block.'
    );
    return <></>;
  }

  return (
    <Tabs
      className={className || ''}
      {...(defaultActiveKey ? { defaultActiveKey } : {})}
    >
      {tabBlocks}
    </Tabs>
  );
};

export default TabsBlock;
