import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsAlertBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsAlertBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Alert = ({ attributes: { colorSlug, className, text } }: Props) =>
  text ? (
    <div className={`alert ${colorSlug || ''} ${className || ''}`}>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  ) : (
    <></>
  );

export default Alert;
