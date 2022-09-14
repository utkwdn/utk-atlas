import { UtkwdsLeadBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsLeadBlockAttributes>;
}

const Lead = ({ attributes: { className, align, content } }: Props) => {
  if (!content) {
    console.error('A `Lead` block is missing `content`. Skipping this block.');
    return <></>;
  }

  return (
    <p
      className={`lead ${className || ''} ${
        align ? `has-text-align-${align}` : ''
      }`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default Lead;
