import Alert from 'components/blocks/Alert';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Organisms/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  attributes: {
    colorSlug: 'alert-smokey',
    text: /* html */ `This is an alert. <a href="">This is a link</a>!`,
  },
};
