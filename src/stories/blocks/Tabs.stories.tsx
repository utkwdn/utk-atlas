import Tabs from 'components/blocks/Tabs';
import { UtkwdsTabBlockAttributes } from 'client';
import { Props as ParagraphProps } from 'components/blocks/core/Paragraph';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';

export default {
  title: 'Blocks/Organisms/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

const mockTabBlock1: InnerAttributesBlock<Partial<UtkwdsTabBlockAttributes>> = {
  name: 'utkwds/tab',

  attributes: {
    tabName: 'First Tab',
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

const mockTabBlock2: InnerAttributesBlock<Partial<UtkwdsTabBlockAttributes>> = {
  name: 'utkwds/tab',

  attributes: {
    tabName: 'Second Tab (should be open on load)',
    tabActive: 'active',
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
    mockTabBlock1,
    mockTabBlock2,
  ] as unknown as InnerAttributesBlock<UtkwdsTabBlockAttributes>[],
};
