import Accordion from 'components/blocks/Accordion';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/Accordion',
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

export const AccordionID = Template.bind({});
AccordionID.args = {
  attributes: {
    accordionID: 'newAccordion',
  },
};
