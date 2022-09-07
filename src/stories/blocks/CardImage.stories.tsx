import CardImage from 'components/blocks/CardImage';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardImage',
  component: CardImage,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardImage>;

const Template: ComponentStory<typeof CardImage> = (args) => (
  <CardImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    // no attributes
  },
};
