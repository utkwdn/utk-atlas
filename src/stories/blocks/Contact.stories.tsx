import Contact from 'components/blocks/Contact';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/Contact',
  component: Contact,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Contact>;

const Template: ComponentStory<typeof Contact> = (args) => (
  <Contact {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    className: '',
    url: '#',
    linkTarget: '#',
    address: /* html */ `555 Main St.<br>Honolulu, HI 96801`,
    email: 'blah@example.com',
  },
};
