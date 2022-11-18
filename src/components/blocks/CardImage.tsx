import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardImageBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardImageBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardImage = ({ innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `CardImage` block has a missing or empty `innerBlocks`. Skipping this block.'
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

export default CardImage;
