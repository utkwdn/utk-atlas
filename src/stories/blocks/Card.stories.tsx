import Card from 'components/blocks/Card';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const LightCard = Template.bind({});
LightCard.args = {
  attributes: {
    blockName: 'utkwds/card',
    color: '#F6F6F6',
    colorSlug: 'bg-light',
    cardOutline: false,
    textColor: 'text-dark',
  },
};

export const SmokeyCard = Template.bind({});
SmokeyCard.args = {
  attributes: {
    blockName: 'utkwds/card',
    color: '#FFFFFF',
    colorSlug: 'bg-smokey',
    cardOutline: false,
    textColor: 'text-light',
  },
};
