import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardTopcapBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardTopcapBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardTopcap = ({ innerBlocks }: Props) => (
  <>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </>
);

export default CardTopcap;
