import { Block } from 'client';

/**
 * Gutenberg Block interface with all properties optional
 * except for `name`, a modified `innerBlocks` that uses
 * `InnerAttributesBlock` itself, and an additional optional
 * `attributes` property.
 *
 * Good to use for mock-data for inner-blocks in Storybook,
 * though still need to do `as unknown as Block` when passing
 * to the actual block-components (for now, anyway).
 */
export type InnerAttributesBlock = Partial<
  Omit<Block, 'innerBlocks' | 'name'>
> & {
  name: string;
  innerBlocks?: InnerAttributesBlock[];
  /**
   * Might never be present in real data (not sure), but having this available
   * at least makes Storybook integration easier (so that we don't have to
   * use `attributesJSON`/`JSON.stringify()` for an `innerBlocks` prop that we
   * feed to a block-component.
   */
  attributes?: object;
};
