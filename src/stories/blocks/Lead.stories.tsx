import Lead from 'components/blocks/Lead';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Atoms/Lead',
  component: Lead,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Lead>;

const Template: ComponentStory<typeof Lead> = (args) => <Lead {...args} />;

export const AlignLeft = Template.bind({});
AlignLeft.args = {
  attributes: {
    backgroundColor: '',
    align: 'left',
  },
};
