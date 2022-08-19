import Test from './blocks/Test';
import HorizontalRule from './blocks/HorizontalRule';
import { Block, HorizontalRuleMainBlockAttributes } from 'client';

interface Props {
  block: Partial<Block>;
}

const BlockRouter = ({ block }: Props) => {
  const { name, innerBlocks, attributesJSON } = block;

  const attributes: object = JSON.parse(attributesJSON || '{}');

  switch (name) {
    case 'utkwds/horizontal-rule': {
      return (
        <HorizontalRule
          attributes={attributes as HorizontalRuleMainBlockAttributes}
        />
      );
    }

    case 'test': {
      return (
        <Test
          innerBlocks={innerBlocks || []}
          /** For a real block, would just import the needed type from `client` */
          attributes={attributes as Parameters<typeof Test>[0]['attributes']}
        />
      );
    }

    default: {
      if (!name) {
        console.error('A block has no `name`.');
      } else {
        console.error(`No component was found for the block named '${name}'.`);
      }
      return <></>;
    }
  }
};

export default BlockRouter;
