import { AttributesBlock } from 'types/AttributesBlock';
import {
  UtkwdsAccordionBlockAttributes,
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
  UtkwdsContactBlockAttributes,
  UtkwdsHorizontalRuleBlockAttributes,
  UtkwdsCalendarBlockAttributes,
  UtkwdsLeadBlockAttributes,
  CoreParagraphBlockAttributes,
  UtkwdsPhoneBlockAttributes,
  UtkwdsPhonesBlockAttributes,
  UtkwdsSocialsBlockAttributes,
  CoreSocialLinksBlockAttributes,
  // CoreSocialLinkBlockAttributes,
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
import Contact from './blocks/Contact';
import Calendar from './blocks/Calendar';
import Lead from './blocks/Lead';
import Paragraph from './blocks/core/Paragraph';
import Phone from './blocks/Phone';
import Phones from './blocks/Phones';
import Socials from './blocks/Socials';
import SocialLinks from './blocks/core/SocialLinks';
// import SocialLink from './blocks/core/SocialLink';

interface Props {
  block: AttributesBlock;
}

const BlockRouter = ({ block }: Props) => {
  const { name, innerBlocks, attributesJSON } = block;

  const attributes =
    block.attributes || (JSON.parse(attributesJSON || '{}') as object);

  switch (name) {
    // Core blocks

    case 'core/paragraph': {
      return (
        <Paragraph attributes={attributes as CoreParagraphBlockAttributes} />
      );
    }

    // Don't use here (gets called directly from our `SocialLinks` component instead)
    // case 'core/social-link': {
    //   return <SocialLink attributes={attributes as CoreSocialLinkBlockAttributes} />
    // }

    case 'core/social-links': {
      return (
        <SocialLinks
          attributes={attributes as CoreSocialLinksBlockAttributes}
          innerBlocks={innerBlocks || []}
        />
      );
    }

    // Custom blocks

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
          attributes={attributes as UtkwdsAccordionBlockAttributes}
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

    case 'utkwds/calendar': {
      return (
        <Calendar attributes={attributes as UtkwdsCalendarBlockAttributes} />
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

    case 'utkwds/card-body': {
      return (
        <CardBody
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardBodyBlockAttributes}
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

    case 'utkwds/card-image': {
      return (
        <CardImage
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardImageBlockAttributes}
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

    case 'utkwds/card-topcap': {
      return (
        <CardTopcap
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsCardTopcapBlockAttributes}
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

    case 'utkwds/columns': {
      return (
        <Columns
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsColumnsBlockAttributes}
        />
      );
    }

    case 'utkwds/contact': {
      return (
        <Contact
          innerBlocks={innerBlocks || []}
          attributes={attributes as UtkwdsContactBlockAttributes}
        />
      );
    }

    case 'utkwds/horizontal-rule': {
      return (
        <HorizontalRule
          attributes={attributes as UtkwdsHorizontalRuleBlockAttributes}
        />
      );
    }

    case 'utkwds/lead': {
      return <Lead attributes={attributes as UtkwdsLeadBlockAttributes} />;
    }

    case 'utkwds/phone': {
      return <Phone attributes={attributes as UtkwdsPhoneBlockAttributes} />;
    }

    case 'utkwds/phones': {
      return (
        <Phones
          attributes={attributes as UtkwdsPhonesBlockAttributes}
          innerBlocks={innerBlocks || []}
        />
      );
    }

    case 'utkwds/socials': {
      return (
        <Socials
          attributes={attributes as UtkwdsSocialsBlockAttributes}
          innerBlocks={innerBlocks || []}
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
