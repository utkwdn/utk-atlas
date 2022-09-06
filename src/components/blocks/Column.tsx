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
}: Props) => (
  <div
    className={`'className col-12 col-md-'${colWidth || ''} ${className || ''}`}
  >
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </div>
);

export default Column;
