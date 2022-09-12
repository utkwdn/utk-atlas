import Phone from 'components/blocks/Phone';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Atoms/Phone',
  component: Phone,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Phone>;

const Template: ComponentStory<typeof Phone> = (args) => <Phone {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  attributes: {
    phoneNum: `1234567890`,
    phoneName: 'Phone',
  },
};
