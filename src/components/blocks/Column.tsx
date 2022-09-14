import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsColumnBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsColumnBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Column = ({
  attributes: { className, colWidth },
  innerBlocks,
}: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `Column` block has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div
      className={`col-12 ${className || ''} ${
        colWidth !== undefined ? `col-md-${colWidth}` : ''
      }`}
    >
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </div>
  );
};

export default Column;
