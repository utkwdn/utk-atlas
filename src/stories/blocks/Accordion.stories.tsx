import Accordion from 'components/blocks/Accordion';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Organisms/Accordion',
  component: Accordion,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const Collapsed = Template.bind({});
Collapsed.args = {
  attributes: {
    accordionID: 'id',
  },
};

export const Expanded = Template.bind({});
Expanded.args = {
  attributes: {},
};
