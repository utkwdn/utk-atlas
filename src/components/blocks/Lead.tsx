import { LeadMainBlock, LeadMainBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: LeadMainBlockAttributes;
}

const Lead = ({ attributes: { className, align, content } }: Props) => (
  <p className={`'lead has-text-align-'${align || ''} ${className || ''}`}>
    {' '}
    {content || ''}{' '}
  </p>
);

export default Lead;
