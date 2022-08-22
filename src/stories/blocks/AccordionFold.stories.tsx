import AccordionFold from 'components/blocks/AccordionFold';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Blocks/Molecules/AccordionFold',
  component: AccordionFold,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AccordionFold>;

const Template: ComponentStory<typeof AccordionFold> = (args) => (
  <AccordionFold {...args} />
);

export const FoldName = Template.bind({});
FoldName.args = {
  attributes: {
    foldName: '',
  },
};
export const FoldNamePH = Template.bind({});
FoldNamePH.args = {
  attributes: {
    foldNamePH: 'New Section',
  },
};

export const FoldSlug = Template.bind({});
FoldSlug.args = {
  attributes: {
    foldSlug: 'new-fold',
  },
};
export const Show = Template.bind({});
Show.args = {
  attributes: {
    type: Boolean,
    show: false,
  },
};
export const ShowS = Template.bind({});
ShowS.args = {
  attributes: {
    showS: '',
  },
};
export const CollapseS = Template.bind({});
CollapseS.args = {
  attributes: {
    collapseS: ' collapsed',
  },
};
export const ParentID = Template.bind({});
ParentID.args = {
  attributes: {
    parentID: '',
  },
};
