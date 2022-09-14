import Column from 'components/blocks/Column';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/Column',
  component: Column,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Column>;

const Template: ComponentStory<typeof Column> = (args) => <Column {...args} />;

export const Width = Template.bind({});
Width.args = {
  attributes: {
    colWidth: 3,
  },
};
