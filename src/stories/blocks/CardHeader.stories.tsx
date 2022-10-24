import CardHeader from 'components/blocks/CardHeader';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardHeader',
  // this should probably be an Atom – but for now am sticking all the card components under Molecules
  // I assume all of these should live together and might be a better way to do that?
  component: CardHeader,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardHeader>;

const Template: ComponentStory<typeof CardHeader> = (args) => (
  <CardHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    content: 'This is a Card Header',
    tagName: 'div',
  },
};
