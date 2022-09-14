import { CoreParagraphBlockAttributes } from 'client';

/** Not sure about this! Should test. */
type Style = {
  typography?: {
    fontSize?: string;
  };
};

export interface Props {
  attributes: Partial<
    Omit<CoreParagraphBlockAttributes, 'style'> & {
      style?: string;
    }
  >;
}

const Paragraph = ({
  attributes: {
    align,
    anchor,
    backgroundColor,
    className,
    content,
    direction,
    dropCap,
    fontSize,
    style: styleJSON,
    textColor,
  },
}: Props) => {
  if (!content) {
    console.error(
      'A `Paragraph` block is missing `content`. Skipping this block.'
    );
    return <></>;
  }

  const styleObj = styleJSON ? (JSON.parse(styleJSON) as Style) : undefined;

  const style =
    styleObj && styleObj.typography && styleObj.typography instanceof Object
      ? { ...styleObj.typography }
      : undefined;

  return (
    <p
      className={`
        ${className || ''}
        ${align ? 'has-text-align-' + align : ''}
        ${dropCap ? 'has-drop-cap' : ''}
        ${backgroundColor ? 'has-' + backgroundColor + '-background-color' : ''}
        ${textColor ? 'has-' + textColor + '-color' : ''}
        ${fontSize ? 'has-' + fontSize + '-font-size' : ''}
      `}
      {...(anchor ? { id: anchor } : {})}
      {...(style ? { style } : {})}
      /* not really sure if this is right for `direction`, but I think it probably is */
      {...(direction ? { dir: direction } : {})}
    >
      {content}
    </p>
  );
};

export default Paragraph;
