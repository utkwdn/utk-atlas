import { UtkwdsPhoneBlockAttributes } from 'client';

export interface Props {
  /**
   * Use `phoneNum`, `phoneName`, and (maybe) `className`.
   */
  attributes: Partial<UtkwdsPhoneBlockAttributes>;
}

/**
 * Depends on the Plugin repo enforcing correct formatting in the block-editor,
 * which I don't think it currently does. (Must be a string of 10 integers.)
 */
const phoneRegEx = /^(\d{3})(\d{3})(\d{4})$/;

const invalidPhoneNumMsg =
  'A `Phone` block has a missing or invalid `phoneNum` attribute (must be a string of 10 integers). Skipping this block.';

const Phone = ({ attributes: { phoneNum, phoneName, className } }: Props) => {
  if (!phoneName) {
    console.warn(
      'A `Phone` block has a missing `phoneName` attribute. Still rendering the block.'
    );
  }

  if (!phoneNum || !phoneRegEx.test(phoneNum)) {
    console.error(invalidPhoneNumMsg);
    return <></>;
  }

  const phoneNumParts = phoneNum.match(phoneRegEx);
  if (
    !phoneNumParts ||
    !phoneNumParts[1] ||
    !phoneNumParts[2] ||
    !phoneNumParts[3]
  ) {
    console.error(invalidPhoneNumMsg);
    return <></>;
  }

  const formattedPhoneNumber =
    phoneNumParts[1] + '-' + phoneNumParts[2] + '-' + phoneNumParts[3];

  return (
    <small className={`phoneNumber ${className || ''}`}>
      {phoneName && (
        <>
          <span>{phoneName}</span>:&nbsp;
        </>
      )}
      {/* why `text-white`? */}
      <a className="text-white tel" href={`tel:${phoneNum}`}>
        {formattedPhoneNumber}
      </a>
    </small>
  );
};

export default Phone;
