import {
  CoreSocialLinkBlockAttributes,
  CoreSocialLinksBlockAttributes,
} from 'client';
import { AttributesBlock } from 'types/AttributesBlock';
import SocialLink from './SocialLink';
import { Layout, toFlexLayoutStyle } from './helpers/SocialLinks-helpers';
import './SocialLinks.scss';

export interface Props {
  attributes: Partial<
    Omit<CoreSocialLinksBlockAttributes, 'layout'> & {
      layout?: string;
    }
  >;
  /** Should only be `'core/social-link'` blocks. */
  innerBlocks?: AttributesBlock[];
}

const SocialLinks = ({
  attributes: {
    /** Actual hex or rgb (etc.) value. Orange: `rgb(225, 130, 0)` Gray: `rgb(88, 89, 91)`, White: '#fff' */
    iconBackgroundColorValue,
    /** Actual hex or rgb (etc.) value. Orange: `rgb(225, 130, 0)` Gray: `rgb(88, 89, 91)`, White: '#fff' */
    iconColorValue,
    showLabels,
    /**
     * Classes: 'has-small-icon-size', 'has-normal-icon-size', 'has-large-icon-size', 'has-huge-icon-size'.
     * Presumably will need styles for them from https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/social-links/style.scss
     */
    size,
    anchor,
    /**
     * Custom, plus possibly `.is-style-pill-shape`, `.is-style-logos-only`, or `.is-style-default`.
     * Will need styles for those classes from https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/social-links/style.scss
     */
    className,
    openInNewTab,
    align,
    layout: layoutJSON,
    // style, /* I don't think this is needed */
  },
  innerBlocks,
}: Props) => {
  const socialLinkItems = innerBlocks
    ? innerBlocks.flatMap((block, i) => {
        if (block.name !== 'core/social-link') {
          console.error(
            'An inner-block of a `SocialLinks` block is not a `SocialLink` block (has the wrong `name`). Skipping this inner-block.'
          );
          return [];
        }

        // not sure if this is necessary
        const attributes = (block.attributes ||
          JSON.parse(
            block.attributesJSON || '{}'
          )) as CoreSocialLinkBlockAttributes;
        return (
          <SocialLink
            attributes={attributes}
            key={i}
            showLabels={showLabels}
            iconColorValue={iconColorValue || undefined}
            iconBackgroundColorValue={iconBackgroundColorValue || undefined}
            openInNewTab={openInNewTab}
          />
        );
      })
    : undefined;

  if (!socialLinkItems || !socialLinkItems.length) {
    console.error(
      'A `SocialLinks` block has a missing `innerBlocks` or an `innerBlocks` with no `SocialLink`-block children. Skipping this `SocialLinks` block.'
    );
    return <></>;
  }

  const layoutObj = layoutJSON ? (JSON.parse(layoutJSON) as Layout) : undefined;
  const layout = layoutObj && toFlexLayoutStyle(layoutObj);

  return (
    <ul
      className={`
        wp-block-social-links
        ${className || ''}
        ${size || ''}
        ${align ? 'align' + align : ''}
        ${showLabels ? 'has-visible-labels' : ''}
        ${iconColorValue ? 'has-icon-color' : ''}
        ${iconBackgroundColorValue ? 'has-icon-background-color' : ''}
      `}
      {...(anchor ? { id: anchor } : {})}
      {...(layout ? { style: layout } : {})}
    >
      {socialLinkItems}
    </ul>
  );
};

export default SocialLinks;