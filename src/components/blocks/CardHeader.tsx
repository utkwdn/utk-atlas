import { UtkwdsCardHeaderBlockAttributes } from 'client';

interface Props {
  attributes: Partial<UtkwdsCardHeaderBlockAttributes>;
}

const CardHeader = ({ attributes: { className, content } }: Props) =>
  content ? (
    // this also has an attribute of tagName so that you can change the type of container
    // not sure if we need that or how to implement?
    // the default was div – so I have just used that for now
    <div
      className={`'card-header' ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  ) : (
    <></>
  );

export default CardHeader;
