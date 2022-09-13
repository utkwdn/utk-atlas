import Calendar from 'components/blocks/Calendar';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Organisms/Calendar',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  attributes: {
    calTemplate: '',
    numResults: 5,
    daysAhead: 31,
    department: '',
    place: '',
    group: '',
    type: '',
    topic: '',
    audience: '',
    keywords: '',
    featured: false,
    featuredS: '',
    sponsored: false,
    sponsoredS: '',
    matching: false,
    matchingS: '',
    past: false,
    pastS: '',
    mustMatch: '',
    exType: '',
    exTopic: '',
    exAudience: '',
    widgetType: '',
    /** 'modern', 'hill-cards', 'hill-simple-list', 'hill-list-alt', 'hill-modern', 'hill-modern-no-description', 'hill-simple-columns' */
    template: 'modern',
    hideDesc: false,
    hideDescS: '',
    truncate: false,
    truncateS: '',
    htmlDesc: false,
    htmlDescS: '',
    evImage: false,
    evImageS: '',
    evTime: false,
    evTimeS: '',
    viewAll: false,
    viewAllS: '',
    newWin: false,
    newWinS: '',
    hideDrop: false,
    hideDropS: '',
    incStyle: true,
    incStyleS: '',
  },
};
