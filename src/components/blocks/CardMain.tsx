import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCardMainBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsCardMainBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const CardMain = ({ innerBlocks }: Props) => (
  <>
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </>
);

export default CardMain;
