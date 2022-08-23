import Alert from 'components/blocks/Alert';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/Alert',
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

export const ImagePosition = Template.bind({});
ImagePosition.args = {
  attributes: {
    imagePostion: {
      name: 'Smokey',
      slug: 'alert-smokey',
      color: '#58595B',
      text: 'text-white',
    },
    placeholder: 'Enter alert text here.',
  },
};
