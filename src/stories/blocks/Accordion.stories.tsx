import Accordion from 'components/blocks/Accordion';
import { Block } from 'client';
import { Props as AccordionFoldProps } from 'components/blocks/AccordionFold';
import { Props as ParagraphProps } from 'components/blocks/core/Paragraph';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';

export default {
  title: 'Blocks/Molecules/Accordion',
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

const mockAccordionFoldBlock1: InnerAttributesBlock = {
  name: 'utkwds/accordion-fold',

  attributes: {
    foldSlug: 'foldSlug1',
    foldName: 'Panel 1',
  } as AccordionFoldProps['attributes'],

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

const mockAccordionFoldBlock2: InnerAttributesBlock = {
  name: 'utkwds/accordion-fold',

  attributes: {
    foldSlug: 'foldSlug2',
    foldName: 'Panel 2',
  } as AccordionFoldProps['attributes'],

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
    mockAccordionFoldBlock1 as unknown as Block,
    mockAccordionFoldBlock2 as unknown as Block,
  ],
};
