import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardBodyBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardBodyBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardBody = ({
  attributes: { className, textColor },
  innerBlocks,
}: Props) => (
  <div className={`card-body ${className || ''} ${textColor || ''}`}>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </div>
);

export default CardBody;
