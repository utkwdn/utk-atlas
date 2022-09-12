import { UtkwdsSocialsBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';
import { AttributesBlock } from 'types/AttributesBlock';

interface Props {
  attributes: Partial<UtkwdsSocialsBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Socials = ({ attributes: { className }, innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `Socials` block has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div className={`socialMedia col-auto ${className || ''}`}>
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </div>
  );
};

export default Socials;
