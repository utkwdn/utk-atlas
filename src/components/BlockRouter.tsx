import { AttributesBlock } from 'types/AttributesBlock';
import {
  UtksdsAccordionBlockAttributes,
  UtkwdsAccordionFoldBlockAttributes,
  UtkwdsAlertBlockAttributes,
  UtkwdsColumnBlockAttributes,
  UtkwdsHorizontalRuleBlockAttributes,
  UtkwdsLeadBlockAttributes,
} from 'client';

import Test from './blocks/Test';
import HorizontalRule from './blocks/HorizontalRule';
import Accordion from './blocks/Accordion';
import AccordionFold from './blocks/AccordionFold';
import Alert from './blocks/Alert';
import Column from './blocks/Column';
import Lead from './blocks/Lead';

interface Props {
  block: AttributesBlock;
}

const BlockRouter = ({ block }: Props) => {
  const { name, innerBlocks, attributesJSON } = block;

  const attributes =
    block.attributes || (JSON.parse(attributesJSON || '{}') as object);

  switch (name) {
    case 'utkwds/horizontal-rule': {
      return (
        <HorizontalRule
          attributes={attributes as UtkwdsHorizontalRuleBlockAttributes}
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

    case 'utkwds/accordion': {
      return (
        <Accordion
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtksdsAccordionBlockAttributes}
        />
      );
    }

    case 'utkwds/accordion-fold': {
      return (
        <AccordionFold
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsAccordionFoldBlockAttributes}
        />
      );
    }

    case 'utkwds/alert': {
      return <Alert attributes={attributes as UtkwdsAlertBlockAttributes} />;
    }
    case 'utkwds/column': {
      return (
        <Column
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsColumnBlockAttributes}
        />
      );
    }

    case 'utkwds/lead': {
      return <Lead attributes={attributes as UtkwdsLeadBlockAttributes} />;
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
