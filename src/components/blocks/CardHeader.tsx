import { UtkwdsCardHeaderBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsCardHeaderBlockAttributes>;
}

const CardHeader = ({
  attributes: { className, content, tagName: TagName },
}: Props) => {
  if (!content || !TagName) return <></>;
  return (
    <TagName
      className={`card-header ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></TagName>
  );
};

export default CardHeader;
