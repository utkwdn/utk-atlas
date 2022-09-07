import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsColumnsBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsColumnsBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Columns = ({ attributes: { className }, innerBlocks }: Props) => (
  <div className={`row ${className || ''}`}>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </div>
);

export default Columns;
