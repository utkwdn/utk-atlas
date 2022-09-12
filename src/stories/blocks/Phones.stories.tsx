import Phones from 'components/blocks/Phones';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';
import { Props as PhoneProps } from 'components/blocks/Phone';
import { Block } from 'client';

export default {
  title: 'Blocks/Molecules/Phones',
  component: Phones,
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Phones>;

const Template: ComponentStory<typeof Phones> = (args) => <Phones {...args} />;

const mockPhones: InnerAttributesBlock[] = [
  {
    attributes: {
      phoneNum: '8037591275',
      phoneName: 'Phone',
    } as PhoneProps['attributes'],
  },
  {
    attributes: {
      phoneNum: '2958361007',
      phoneName: 'Another Phone',
    } as PhoneProps['attributes'],
  },
].map((phone) => ({ ...phone, name: 'utkwds/phone' }));

export const Primary = Template.bind({});
Primary.args = {
  attributes: {},
  innerBlocks: mockPhones as unknown as Block[],
};
