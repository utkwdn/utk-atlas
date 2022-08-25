import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Test from 'components/blocks/Test';
import { UtkwdsHorizontalRuleBlockAttributes } from 'client';

export default {
  title: 'Blocks/Molecules/Test',
  component: Test,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

const mockHrAttributes1: UtkwdsHorizontalRuleBlockAttributes = {
  imagePostion: 'hr',
};
const mockHrAttributes2: UtkwdsHorizontalRuleBlockAttributes = {
  imagePostion: 'orange-separator',
};

export const Primary = Template.bind({});
Primary.args = {
  attributes: {
    foo: 'foo',
    bar: 'bar',
  },
  innerBlocks: [
    {
      name: 'utkwds/horizontal-rule',
      attributes: mockHrAttributes1,
    },
  ],
};

export const Secondary = Template.bind({});
Secondary.args = {
  attributes: {
    foo: 'foo',
  },
  innerBlocks: [
    {
      name: 'utkwds/horizontal-rule',
      attributes: mockHrAttributes1,
    },
    {
      name: 'utkwds/horizontal-rule',
      attributes: mockHrAttributes2,
    },
  ],
};
