import SocialLink from 'components/blocks/core/SocialLink';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Atoms/SocialLink',
  component: SocialLink,
  decorators: [
    (Story) => (
      <div className="container">
        <ul className="wp-block-social-links">
          <Story />
        </ul>
      </div>
    ),
  ],
} as ComponentMeta<typeof SocialLink>;

const colorOptions = {
  orange: 'rgb(225, 130, 0)',
  smokey: 'rgb(88, 89, 91)',
  white: '#fff',
};

const Template: ComponentStory<typeof SocialLink> = (args) => (
  <SocialLink {...args} />
);

/*
  attributes: { url, service, label },
  showLabels,
  iconBackgroundColorValue,
  iconColorValue,
  openInNewTab,
*/
export const Primary = Template.bind({});
Primary.args = {
  attributes: {
    url: 'https://google.com',
    service: 'facebook',
    label: 'facebook',
  },
  showLabels: false,
  iconBackgroundColorValue: colorOptions.orange,
  iconColorValue: colorOptions.white,
  openInNewTab: true,
};
