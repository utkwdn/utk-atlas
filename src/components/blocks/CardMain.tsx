import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardMainBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardMainBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardMain = ({ innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `CardMain` block has a missing or empty `innerBlocks`. Skipping this block.'
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

export default CardMain;
