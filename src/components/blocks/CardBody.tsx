import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardBodyBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardBodyBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardBody = ({
  attributes: { className, textColor },
  innerBlocks,
}: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `CardBody` block has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div className={`card-body ${className || ''} ${textColor || ''}`}>
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </div>
  );
};

export default CardBody;
