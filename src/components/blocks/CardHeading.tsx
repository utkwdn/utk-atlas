import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardHeadingBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardHeadingBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardHeading = ({ innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `CardHeading` block has a missing or empty `innerBlocks`. Skipping this block.'
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

export default CardHeading;
