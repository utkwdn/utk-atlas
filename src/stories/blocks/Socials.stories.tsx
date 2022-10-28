import Socials from 'components/blocks/Socials';

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InnerAttributesBlock } from 'types/InnerAttributesBlock';
import { Props as SocialLinksProps } from 'components/blocks/core/SocialLinks';
import { Props as SocialLinkProps } from 'components/blocks/core/SocialLink';
import { Block } from 'client';
import { Layout } from 'components/blocks/core/helpers/SocialLinks-helpers';

export default {
  title: 'Blocks/Molecules/Socials',
  component: Socials,
  decorators: [
    (Story) => (
      <div className="container pt-4">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Socials>;

const Template: ComponentStory<typeof Socials> = (args) => (
  <Socials {...args} />
);

const mockSocialLinkBlocks: InnerAttributesBlock<
  SocialLinkProps['attributes']
>[] = [
  {
    attributes: {
      url: 'https://wordpress.com',
      service: 'wordpress',
    },
  },
  {
    attributes: {
      url: 'https://facebook.com',
      service: 'facebook',
      label: 'Custom label (Facebook)',
    },
  },
  {
    attributes: {
      url: 'https://youtube.com',
      service: 'youtube',
    },
  },
  {
    attributes: {
      url: 'https://twitter.com',
      service: 'twitter',
    },
  },
].map((socialLinkBlock) => ({ ...socialLinkBlock, name: 'core/social-link' }));

const colorOptions = {
  default: undefined,
  orange: 'rgb(225, 130, 0)',
  smokey: 'rgb(88, 89, 91)',
  white: '#fff',
};

const sizeOptions = {
  small: 'has-small-icon-size',
  normal: 'has-normal-icon-size',
  large: 'has-large-icon-size',
  huge: 'has-huge-icon-size',
};

const classNameOptions = {
  default: 'is-style-default',
  pill: 'is-style-pill-shape',
  logosOnly: 'is-style-logos-only',
};

const alignOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const mockSocialLinks: InnerAttributesBlock<SocialLinksProps['attributes']>[] =
  [
    {
      name: 'core/social-links',
      attributes: {
        iconBackgroundColorValue: colorOptions.default,
        iconColorValue: colorOptions.default,
        showLabels: false,
        size: sizeOptions.normal,
        className: classNameOptions.default,
        openInNewTab: true,
        align: alignOptions.center,
        layout: JSON.stringify({
          type: 'flex',
          // orientation
          // justifyContent
          // flexWrap
          // verticalAlignment
          // alignItems
        } as Layout),
      },
      innerBlocks: mockSocialLinkBlocks,
    },
  ];

export const Primary = Template.bind({});
Primary.args = {
  attributes: {},
  innerBlocks: mockSocialLinks as unknown as Block[],
};