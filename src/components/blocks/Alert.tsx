import { AlertMainBlock, AlertMainBlockAttributes, Block } from 'client';
import BlockRouter from 'components/BlockRouter';
import { ImagePosition } from 'stories/blocks/Alert.stories';

interface Props {
  attributes: AlertMainBlockAttributes;
  innerBlocks?: Partial<Block>[];
}

const Alert = ({
  attributes: { className, imagePostion, placeholder },
}: //   Main schema has typo - ImagePosition. Missing an i so listed here as imagePostion
Props) => (
  <div className={`alert ${imagePostion} ${className || ''}`}>
    <span>{placeholder || ''}</span>
  </div>
);

export default Alert;
