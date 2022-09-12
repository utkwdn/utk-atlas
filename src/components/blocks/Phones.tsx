import { UtkwdsPhonesBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';
import { AttributesBlock } from 'types/AttributesBlock';

interface Props {
  attributes: Partial<UtkwdsPhonesBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Phones = ({ attributes: { className }, innerBlocks }: Props) => {
  if (!innerBlocks || !innerBlocks.length) {
    console.error(
      'A `Phones` block has a missing or empty `innerBlocks`. Skipping this block.'
    );
    return <></>;
  }

  return (
    <div className={`phoneNumbers col-auto ${className || ''}`}>
      {innerBlocks.map((block, i) => (
        <BlockRouter block={block} key={i} />
      ))}
    </div>
  );
};

export default Phones;
