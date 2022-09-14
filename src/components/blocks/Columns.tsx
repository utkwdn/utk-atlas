import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsColumnsBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsColumnsBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Columns = ({ attributes: { className }, innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `Columns` block has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div className={`row ${className || ''}`}>
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </div>
  );
};

export default Columns;
