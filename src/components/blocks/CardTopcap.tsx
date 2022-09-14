import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardTopcapBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardTopcapBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardTopcap = ({ innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `CardTopcap` block has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <>
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </>
  );
};

export default CardTopcap;
