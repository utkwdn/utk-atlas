import { CoreSocialLinkBlockAttributes } from 'client';

import { icons, isIconKey } from './helpers/SocialLink-helpers';

export interface Props {
  attributes: Partial<CoreSocialLinkBlockAttributes>;
  showLabels?: boolean;
  /** Actual hex or rgb (etc.) value. Orange: `rgb(225, 130, 0)` Gray: `rgb(88, 89, 91)`, White: '#fff' */
  iconColorValue?: string;
  /** Actual hex or rgb (etc.) value. Orange: `rgb(225, 130, 0)` Gray: `rgb(88, 89, 91)`, White: '#fff' */
  iconBackgroundColorValue?: string;
  openInNewTab?: boolean;
}

/** Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/social-link/index.php */
const SocialLink = ({
  attributes: { url, service, label },
  showLabels,
  iconBackgroundColorValue,
  iconColorValue,
  openInNewTab,
}: Props) => {
  if (!url || !service) {
    console.error(
      'A `SocialLink` block is missing a `url` or `service` attribute, both of which are required. Skipping block.'
    );
    return <></>;
  }

  if (!isIconKey(service)) {
    console.error(
      'A `SocialLink` block has a `service` attribute ("' +
        service +
        '") that does not match an icon in our icon-dictionary. If this is because a new icon-option was added in WordPress, a corresponding option will have to be added in the Next.js app. Skipping block.'
    );
    return <></>;
  }

  // prepend `mailto:` to `url` if `url` is an email address?

  // prepend `url` with `https://` if it doesn't appear to contain a scheme and is not a relative link starting with `//`?

  // account for possibility of opening in new tab / target attribute?

  const { name, icon: Icon }: { name: string; icon: () => JSX.Element } =
    icons[service];

  const style =
    iconBackgroundColorValue || iconColorValue
      ? {
          ...(iconBackgroundColorValue
            ? { backgroundColor: iconBackgroundColorValue }
            : {}),
          ...(iconColorValue ? { color: iconColorValue } : {}),
        }
      : undefined;

  return (
    <li
      className={`wp-social-link wp-block-social-link wp-social-link-${service}`}
      style={style}
    >
      <a
        className="wp-block-social-link-anchor"
        href={url}
        {...(openInNewTab
          ? { rel: 'noopener nofollow', target: '_blank' }
          : {})}
      >
        <Icon />
        <span
          className={`wp-block-social-link-label ${
            showLabels ? '' : 'sr-only visually-hidden'
          }`}
        >
          {label || name}
        </span>
      </a>
    </li>
  );
};

export default SocialLink;
