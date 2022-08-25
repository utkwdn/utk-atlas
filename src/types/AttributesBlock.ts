import { Block } from 'client';

/**
 * Gutenberg Block interface with all properties optional
 * and an additional optional `attributes` property.
 */
export type AttributesBlock = Partial<
  Block & {
    /**
     * Might never be present in real data (not sure), but having this available
     * at least makes Storybook integration easier (so that we don't have to
     * use `attributesJSON`/`JSON.stringify()` for an `innerBlocks` prop that we
     * feed to a block-component.
     */
    attributes?: object;
  }
>;
