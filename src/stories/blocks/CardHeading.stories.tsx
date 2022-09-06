import CardHeading from 'components/blocks/CardHeading';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardHeading',
  component: CardHeading,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardHeading>;

const Template: ComponentStory<typeof CardHeading> = (args) => (
  <CardHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    // no attributes
  },
};
