import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsContactBlockAttributes } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: Partial<UtkwdsContactBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

function MapMarker() {
  return (
    <svg
      className="meta-address"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>
    </svg>
  );
}

const Contact = ({
  attributes: { className, url, linkTarget, address, email },
  innerBlocks,
}: Props) => (
  <div className={`contact_info ${className || ''}`}>
    {address &&
      (url ? (
        <div className="address col-auto">
          {/* note: might need to change layout here if address is allowed to go more than one line */}
          <MapMarker />
          <a
            /* why `text-white`? */
            className="text-white map-link"
            href={url}
            {...(linkTarget ? { target: linkTarget } : {})}
          >
            <span dangerouslySetInnerHTML={{ __html: address }} />
          </a>
        </div>
      ) : (
        <div className="address col-auto">
          <span dangerouslySetInnerHTML={{ __html: address }} />
        </div>
      ))}
    {email && (
      <small className="emailList">
        Email:&nbsp;
        <a
          className="email text-white text-reset"
          href={`mailto:${email}`}
          {...(linkTarget ? { target: linkTarget } : {})}
        >
          <span dangerouslySetInnerHTML={{ __html: email }} />
        </a>
      </small>
    )}
    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </div>
);

export default Contact;
