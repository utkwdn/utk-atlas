import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardImageBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardImageBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardImage = ({ innerBlocks }: Props) => (
  <>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </>
);

export default CardImage;
