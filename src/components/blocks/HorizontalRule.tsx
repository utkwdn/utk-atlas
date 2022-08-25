import { UtkwdsHorizontalRuleBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsHorizontalRuleBlockAttributes>;
}

/**
 * Valid values for the `attributes.imagePostion` prop include:
 * - `'hr'`
 * - `'orange-separator'`
 * - `'orange-hash'`
 */
const HorizontalRule = ({ attributes: { className, imagePostion } }: Props) => (
  <hr className={`${imagePostion || ''} ${className || ''}`} />
);

export default HorizontalRule;
