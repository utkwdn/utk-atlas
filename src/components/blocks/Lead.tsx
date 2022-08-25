import { UtkwdsLeadBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsLeadBlockAttributes>;
}

const Lead = ({ attributes: { className, align, content } }: Props) =>
  content ? (
    <p
      className={`lead ${className || ''} ${
        align ? `has-text-align-${align}` : ''
      }`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  ) : (
    <></>
  );

export default Lead;
