import { UtkwdsStripBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';
import { AttributesBlock } from 'types/AttributesBlock';

interface Props {
  attributes: Partial<UtkwdsStripBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Strip = ({
  attributes: { className, imageUrl, colorSlug, textColor, padding, spacing },
  innerBlocks,
}: Props) => (
  <div className={className || ''}>
    <div
      className={`
        strip
        ${padding || ''}
        ${spacing !== undefined ? `my-${spacing}` : ''}
        ${imageUrl ? '' : `${colorSlug || ''} ${textColor || ''}`}
      `}
      {...(imageUrl ? { style: { backgroundImage: `url(${imageUrl})` } } : {})}
    >
      <div className="container">
        {!!innerBlocks?.length &&
          innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
      </div>
    </div>
  </div>
);

export default Strip;
