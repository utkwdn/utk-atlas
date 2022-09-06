import CardMain from 'components/blocks/CardMain';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/CardMain',
  component: CardMain,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardMain>;

const Template: ComponentStory<typeof CardMain> = (args) => (
  <CardMain {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    // no attributes
  },
};
