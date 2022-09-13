import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { AttributesBlock } from 'types/AttributesBlock';
import {
  Block,
  UtkwdsTabBlock,
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
  const tabBlocks = innerBlocks
    ? innerBlocks.filter((innerBlock) => innerBlock.name === 'utkwds/tab')
    : undefined;

  if (!tabBlocks || !tabBlocks.length) {
    console.error(
      'A `Tabs` block has a missing `innerBlocks` or an `innerBlocks` with no `Tab`-block children. Skipping this block.'
    );
    return <></>;
  }

  let defaultActiveKey: string | undefined;

  const tabBlockChildren = tabBlocks.flatMap((tab, i) => {
    // not sure if this is necessary
    const attributes =
      tab.attributes ||
      (JSON.parse(tab.attributesJSON || '{}') as UtkwdsTabBlockAttributes);

    if (!attributes.tabName) {
      console.error(
        'A `Tab` block is missing a `tabName` attribute, which is required. Skipping this block.'
      );
      return [];
    }

    const eventKey = attributes.tabSlug || `${i}`;

    // IS THIS RIGHT? OR DO WE WANT `attributes.tabActive`? ARE BOTH NEEDED? WHAT ABOUT `fade` thing?
    if (!defaultActiveKey && attributes.tabShow) {
      defaultActiveKey = eventKey;
    }

    return (
      <Tab title={attributes.tabName} eventKey={eventKey}>
        {tab.innerBlocks &&
          tab.innerBlocks.map((block, i) => (
            <BlockRouter block={block as Block} key={i} />
          ))}
      </Tab>
    );
  });

  return (
    <Tabs
      className={className || ''}
      {...(defaultActiveKey ? { defaultActiveKey } : {})}
    >
      {tabBlockChildren}
    </Tabs>
  );
};

export default TabsBlock;
