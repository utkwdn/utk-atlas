import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardFooterBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsCardFooterBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardFooter = ({
  attributes: { className, mutedClass, content },
}: Props) => {
  if (!content) {
    console.error(
      'A `CardFooter` block is missing `content`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div
      className={`card-footer ${mutedClass || ''} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
export default CardFooter;
