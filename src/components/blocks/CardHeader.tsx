import { UtkwdsCardHeaderBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsCardHeaderBlockAttributes>;
}

const CardHeader = ({
  attributes: { className, content, tagName: TagName },
}: Props) => {
  if (!content) {
    console.error(
      'A `CardHeader` block is missing `content`. Skipping this block.'
    );
    return <></>;
  }

  switch (TagName) {
    case 'div':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      return (
        <TagName
          className={`card-header ${className || ''}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    default: {
      console.error(
        'A `CardHeader` has an invalid `attributes.tagName` (must be `div` or an h-tag). Skipping this block.'
      );
      return <></>;
    }
  }
};

export default CardHeader;
