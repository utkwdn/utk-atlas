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
};
