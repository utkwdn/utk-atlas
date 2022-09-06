import CardBody from 'components/blocks/CardBody';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardBody',
  component: CardBody,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardBody>;

const Template: ComponentStory<typeof CardBody> = (args) => (
  <CardBody {...args} />
);

export const TextColor = Template.bind({});
TextColor.args = {
  attributes: {
    textColor: '',
  },
};
