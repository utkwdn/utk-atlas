import Accordion from 'components/blocks/Accordion';
import { UtkwdsAccordionFoldBlockAttributes } from 'client';
import { Props as ParagraphProps } from 'components/blocks/core/Paragraph';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';

export default {
  title: 'Blocks/Organisms/Accordion',
  component: Accordion,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

const mockAccordionFoldBlock1: InnerAttributesBlock<
  Partial<UtkwdsAccordionFoldBlockAttributes>
> = {
  name: 'utkwds/accordion-fold',

  attributes: {
    foldSlug: 'foldSlug1',
    foldName: 'Panel 1',
  },

  innerBlocks: [
    {
      name: 'core/paragraph',
      attributes: {
        content:
          'This is (supposed to be) a white centered paragraph with 39px font and an orange background.',
        align: 'center',
        textColor: 'white',
        backgroundColor: 'orange',
        style: JSON.stringify({ typography: { fontSize: '39px' } }),
      } as ParagraphProps['attributes'],
    },
  ],
};

const mockAccordionFoldBlock2: InnerAttributesBlock<
  Partial<UtkwdsAccordionFoldBlockAttributes>
> = {
  name: 'utkwds/accordion-fold',

  attributes: {
    foldSlug: 'foldSlug2',
    foldName: 'Panel 2 (should be open on load)',
    show: true,
  },

  innerBlocks: [
    {
      name: 'core/paragraph',
      attributes: {
        content:
          'This is (supposed to be) a right-aligned paragraph with large font and orange text.',
        align: 'right',
        textColor: 'orange',
        fontSize: 'large',
      } as ParagraphProps['attributes'],
    },
  ],
};

export const Primary = Template.bind({});
Primary.args = {
  attributes: {
    className: 'test',
  },
  innerBlocks: [
    mockAccordionFoldBlock1,
    mockAccordionFoldBlock2,
  ] as unknown as InnerAttributesBlock<UtkwdsAccordionFoldBlockAttributes>[],
};
