import Strip from 'components/blocks/Strip';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';
import { Props as ParagraphProps } from 'components/blocks/core/Paragraph';
import { Block } from 'client';

export default {
  title: 'Blocks/Organisms/Strip',
  component: Strip,
} as ComponentMeta<typeof Strip>;

const Template: ComponentStory<typeof Strip> = (args) => <Strip {...args} />;

const mockParagraphs: InnerAttributesBlock<ParagraphProps['attributes']>[] = [
  {
    name: 'core/paragraph',
    attributes: {
      content: 'This is just a Paragraph in a Strip.',
    },
  },
];

export const Primary = Template.bind({});
Primary.args = {
  attributes: {},
  innerBlocks: mockParagraphs as unknown as Block[],
};
