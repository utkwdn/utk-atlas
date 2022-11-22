// import { isText } from 'domhandler';
import parse, {
  type HTMLReactParserOptions,
  domToReact,
  Element as DOMHandlerElement,
  DOMNode,
} from 'html-react-parser';

import Link from 'next/link';
import RequestInfoTabs from './RequestInfoTabs';
// import Image from 'next/image';

// workaround b/c of this bug: https://github.com/remarkablemark/html-react-parser/issues/633
const isElement = (domNode: DOMNode): domNode is DOMHandlerElement =>
  domNode.type === 'tag';

const toReactNode = ({
  content,
  isRequestInfo,
}: {
  content: string;
  isRequestInfo?: boolean;
}) => {
  let needsRequestInfoTabs = !!isRequestInfo;

  const parserConfig: HTMLReactParserOptions = {
    replace(domNode) {
      if (!isElement(domNode)) return;

      const attribs: Partial<typeof domNode.attribs> = domNode.attribs;

      switch (domNode.name) {
        // use `next/link` for internal-links
        case 'a': {
          // not yet finalized, but we want a flag set up on the server to indicate that a link is internal
          const { href, 'data-internal-link': dataInternalLink } = attribs;

          if (href && dataInternalLink === 'true') {
            delete attribs.href;
            return (
              <Link href={href}>{domToReact([domNode], parserConfig)}</Link>
            );
          }
        }

        /*
          Temporary hacky way of inserting `RequestInfoTabs` into `/requestinfo` page.
          Eventually we'll want to use an HTML comment on the WP side to flag where the
          `RequestInfoTabs` component should be inserted (and we shouldn't need an `isRequestInfo`
          boolean at all, then).
        */
        case 'div': {
          if (!isRequestInfo) return;
          if (needsRequestInfoTabs) {
            needsRequestInfoTabs = false;
            return <RequestInfoTabs />;
          } else {
            return <></>;
          }
        }
      }
    },
  };

  const parsedContent = parse(content, parserConfig);

  return <>{parsedContent}</>;
};

interface Props {
  /** The HTML content to parse. */
  content: string;
  /** Page slug. */
  slug?: string;
}

const ParsedMarkup = ({ content, slug }: Props) => {
  const isRequestInfo = slug === 'requestinfo';

  const parsedContent = toReactNode({ content, isRequestInfo });

  return parsedContent;
};

export default ParsedMarkup;
