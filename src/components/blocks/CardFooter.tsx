import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardFooterBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsCardFooterBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardFooter = ({
  attributes: { className, mutedClass, content },
}: Props) =>
  content ? (
    <div
      className={`card-footer ${mutedClass || ''} ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  ) : (
    <></>
  );

export default CardFooter;
