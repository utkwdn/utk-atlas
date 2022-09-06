import { AttributesBlock } from 'types/AttributesBlock';
import {
  UtksdsAccordionBlockAttributes,
  UtkwdsAccordionFoldBlockAttributes,
  UtkwdsAlertBlockAttributes,
  UtkwdsColumnsBlockAttributes,
  UtkwdsColumnBlockAttributes,
  UtkwdsCardTopcapBlockAttributes,
  UtkwdsCardMainBlockAttributes,
  UtkwdsCardHeaderBlockAttributes,
  UtkwdsCardHeadingBlockAttributes,
  UtkwdsCardImageBlockAttributes,
  UtkwdsCardFooterBlockAttributes,
  UtkwdsCardBodyBlockAttributes,
  UtkwdsCardBlockAttributes,
  UtkwdsHorizontalRuleBlockAttributes,
  UtkwdsLeadBlockAttributes,
} from 'client';

import Test from './blocks/Test';
import HorizontalRule from './blocks/HorizontalRule';
import Accordion from './blocks/Accordion';
import AccordionFold from './blocks/AccordionFold';
import Alert from './blocks/Alert';
import Columns from './blocks/Columns';
import Column from './blocks/Column';
import CardTopcap from './blocks/CardTopcap';
import CardMain from './blocks/CardMain';
import CardHeader from './blocks/CardHeader';
import CardHeading from './blocks/CardHeading';
import CardImage from './blocks/CardImage';
import CardFooter from './blocks/CardFooter';
import CardBody from './blocks/CardBody';
import Card from './blocks/Card';
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

    case 'utkwds/columns': {
      return (
        <Columns
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsColumnsBlockAttributes}
        />
      );
    }

    case 'utkwds/column': {
      return (
        <Column
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsColumnBlockAttributes}
        />
      );
    }

    case 'utkwds/card-topcap': {
      return (
        <CardTopcap
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardTopcapBlockAttributes}
        />
      );
    }

    case 'utkwds/card-main': {
      return (
        <CardMain
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardMainBlockAttributes}
        />
      );
    }

    case 'utkwds/card-header': {
      return (
        <CardHeader
          attributes={attributes as UtkwdsCardHeaderBlockAttributes}
        />
      );
    }

    case 'utkwds/card-heading': {
      return (
        <CardHeading
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardHeadingBlockAttributes}
        />
      );
    }

    case 'utkwds/card-footer': {
      return (
        <CardFooter
          attributes={attributes as UtkwdsCardFooterBlockAttributes}
        />
      );
    }

    case 'utkwds/card-body': {
      return (
        <CardBody
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardBodyBlockAttributes}
        />
      );
    }

    case 'utkwds/card': {
      return (
        <Card
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardBlockAttributes}
        />
      );
    }

    case 'utkwds/lead': {
      return <Lead attributes={attributes as UtkwdsLeadBlockAttributes} />;
    }

    case 'utkwds/card-image': {
      return (
        <CardImage
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardImageBlockAttributes}
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
