import { CSSProperties } from 'react';

// Used with the default, horizontal flex orientation.
const justifyContentMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
};

// Used with the vertical (column) flex orientation.
const alignItemsMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

const verticalAlignmentMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const flexWrapOptions = ['wrap', 'nowrap'] as const;

export type Layout = {
  type?: 'flex' | string;
  orientation?: 'horizontal' | 'vertical';
  justifyContent?: keyof typeof justifyContentMap;
  flexWrap?: typeof flexWrapOptions[number];
  verticalAlignment?: keyof typeof verticalAlignmentMap;
  alignItems?: keyof typeof alignItemsMap;
};

/** Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/layouts/flex.js */
export const toFlexLayoutStyle = (
  layout: Layout
): CSSProperties | undefined => {
  if (layout.type !== 'flex') return;

  const { orientation = 'horizontal', flexWrap = 'wrap' } = layout;

  // might need to allow this to be adjusted
  const gap = '0.5em';

  const justifyContent =
    layout.justifyContent && justifyContentMap[layout.justifyContent];
  const verticalAlignment =
    layout.verticalAlignment && verticalAlignmentMap[layout.verticalAlignment];
  const alignItems =
    layout.justifyContent && layout.justifyContent !== 'space-between'
      ? alignItemsMap[layout.justifyContent]
      : alignItemsMap.left;

  return {
    display: 'flex',
    flexWrap,
    ...(orientation === 'horizontal'
      ? {
          ...(verticalAlignment && { alignItems: verticalAlignment }),
          ...(justifyContent && { justifyContent }),
        }
      : {
          flexDirection: 'column',
          alignItems,
        }),
    gap,
  };
};
