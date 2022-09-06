import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardHeadingBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardHeadingBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardHeading = ({ innerBlocks }: Props) => (
  <>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </>
);

export default CardHeading;
