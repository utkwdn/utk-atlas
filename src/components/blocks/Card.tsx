import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Card = ({
  attributes: { textColor, colorSlug, className },
  innerBlocks,
}: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `Card` has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div
      className={`card ${textColor || ''} ${colorSlug || ''} ${
        className || ''
      }`}
    >
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </div>
  );
};

export default Card;
