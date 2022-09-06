import CardFooter from 'components/blocks/CardFooter';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardFooter',
  component: CardFooter,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardFooter>;

const Template: ComponentStory<typeof CardFooter> = (args) => (
  <CardFooter {...args} />
);

export const NotMuted = Template.bind({});
NotMuted.args = {
  attributes: {
    content: 'This is a Card Footer',
    mutedClass: '',
  },
};
