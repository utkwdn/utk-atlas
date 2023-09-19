import React from 'react';
// import { AttributesBlock } from 'types/AttributesBlock';
// import { InnerAttributesBlock } from 'types/InnerAttributesBlock';

// // Need to replace client for new faust (e.g.):
// // import { CategoryToPostConnectionPageInfo } from '../__generated__/graphql';
// import {
//   UtkwdsAccordionBlockAttributes,
//   UtkwdsAccordionFoldBlockAttributes,
//   UtkwdsAlertBlockAttributes,
//   UtkwdsContactBlockAttributes,
//   UtkwdsHorizontalRuleBlockAttributes,
//   UtkwdsCalendarBlockAttributes,
//   UtkwdsLeadBlockAttributes,
//   CoreParagraphBlockAttributes,
//   UtkwdsPhoneBlockAttributes,
//   UtkwdsPhonesBlockAttributes,
//   UtkwdsSocialsBlockAttributes,
//   CoreSocialLinksBlockAttributes,
//   UtkwdsTabsBlockAttributes,
//   UtkwdsTabBlockAttributes,
//   // CoreSocialLinkBlockAttributes,
// } from 'client';

// import Accordion from './blocks/Accordion';
// import Alert from './blocks/Alert';
// import Contact from './blocks/Contact';
// import Calendar from './blocks/Calendar';
// import HorizontalRule from './blocks/HorizontalRule';
// import Lead from './blocks/Lead';
// import Paragraph from './blocks/core/Paragraph';
// import Phone from './blocks/Phone';
// import Phones from './blocks/Phones';
// import SocialLinks from './blocks/core/SocialLinks';
// import Socials from './blocks/Socials';
// import Tabs from './blocks/Tabs';
// // import SocialLink from './blocks/core/SocialLink';

// interface Props {
//   block: AttributesBlock;
// }

// const BlockRouter = ({ block }: Props) => {
//   const { name, innerBlocks, attributesJSON } = block;

//   const attributes =
//     block.attributes || (JSON.parse(attributesJSON || '{}') as object);

//   switch (name) {
//     // Core blocks

//     case 'core/paragraph': {
//       return (
//         <Paragraph attributes={attributes as CoreParagraphBlockAttributes} />
//       );
//     }

//     // Don't use here (gets called directly from our `SocialLinks` component instead)
//     // case 'core/social-link': {
//     //   return <SocialLink attributes={attributes as CoreSocialLinkBlockAttributes} />
//     // }

//     case 'core/social-links': {
//       return (
//         <SocialLinks
//           attributes={attributes as CoreSocialLinksBlockAttributes}
//           innerBlocks={innerBlocks || []}
//         />
//       );
//     }

//     // Custom blocks

//     case 'utkwds/accordion': {
//       return (
//         <Accordion
//           innerBlocks={
//             (innerBlocks ||
//               []) as InnerAttributesBlock<UtkwdsAccordionFoldBlockAttributes>[]
//           }
//           attributes={attributes as UtkwdsAccordionBlockAttributes}
//         />
//       );
//     }

//     case 'utkwds/alert': {
//       return <Alert attributes={attributes as UtkwdsAlertBlockAttributes} />;
//     }

//     case 'utkwds/calendar': {
//       return (
//         <Calendar attributes={attributes as UtkwdsCalendarBlockAttributes} />
//       );
//     }

//     case 'utkwds/contact': {
//       return (
//         <Contact
//           innerBlocks={innerBlocks || []}
//           attributes={attributes as UtkwdsContactBlockAttributes}
//         />
//       );
//     }

//     case 'utkwds/horizontal-rule': {
//       return (
//         <HorizontalRule
//           attributes={attributes as UtkwdsHorizontalRuleBlockAttributes}
//         />
//       );
//     }

//     case 'utkwds/lead': {
//       return <Lead attributes={attributes as UtkwdsLeadBlockAttributes} />;
//     }

//     case 'utkwds/phone': {
//       return <Phone attributes={attributes as UtkwdsPhoneBlockAttributes} />;
//     }

//     case 'utkwds/phones': {
//       return (
//         <Phones
//           attributes={attributes as UtkwdsPhonesBlockAttributes}
//           innerBlocks={innerBlocks || []}
//         />
//       );
//     }

//     case 'utkwds/socials': {
//       return (
//         <Socials
//           attributes={attributes as UtkwdsSocialsBlockAttributes}
//           innerBlocks={innerBlocks || []}
//         />
//       );
//     }

//     case 'utkwds/tabs': {
//       return (
//         <Tabs
//           attributes={attributes as UtkwdsTabsBlockAttributes}
//           innerBlocks={
//             innerBlocks as InnerAttributesBlock<UtkwdsTabBlockAttributes>[]
//           }
//         />
//       );
//     }

//     default: {
//       if (!name) {
//         console.error('A block has no `name`.');
//       } else {
//         console.error(`No component was found for the block named '${name}'.`);
//       }
//       return <></>;
//     }
//   }
// };

// export default BlockRouter;
