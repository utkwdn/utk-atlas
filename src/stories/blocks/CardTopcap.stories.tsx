import CardTopcap from 'components/blocks/CardTopcap';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardTopcap',
  component: CardTopcap,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardTopcap>;

const Template: ComponentStory<typeof CardTopcap> = (args) => (
  <CardTopcap {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    // no attributes
  },
};
