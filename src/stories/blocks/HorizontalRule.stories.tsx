import HorizontalRule from 'components/blocks/HorizontalRule';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Atoms/Horizontal Rule',
  component: HorizontalRule,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof HorizontalRule>;

const Template: ComponentStory<typeof HorizontalRule> = (args) => (
  <HorizontalRule {...args} />
);

export const Hr = Template.bind({});
Hr.args = {
  attributes: {
    imagePostion: 'hr',
  },
};

export const OrangeSeparator = Template.bind({});
OrangeSeparator.args = {
  attributes: {
    imagePostion: 'orange-separator',
  },
};

export const OrangeHash = Template.bind({});
OrangeHash.args = {
  attributes: {
    imagePostion: 'orange-hash',
  },
};
