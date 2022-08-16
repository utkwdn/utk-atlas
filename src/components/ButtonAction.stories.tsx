import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonAction from './ButtonAction';

export default {
  title: 'ButtonAction',
  component: ButtonAction,
  argTypes: {
    label: { control: 'Button Label' },
  },
} as ComponentMeta<typeof ButtonAction>;

const Template: ComponentStory<typeof ButtonAction> = (args) => (
  <ButtonAction {...args} />
);

export const Default = Template.bind({});
Default.args = {
  default: true,
  label: 'Click me',
};
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Click me',
};
