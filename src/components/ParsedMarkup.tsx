import parse, {
  type HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element as DOMHandlerElement,
  Comment as DOMHandlerComment,
} from 'html-react-parser';

import Link from 'next/link';
import RequestInfoTabs from './RequestInfoTabs';
// import Image from 'next/image';

// workaround b/c of this bug: https://github.com/remarkablemark/html-react-parser/issues/633
const isElement = (domNode: DOMNode): domNode is DOMHandlerElement =>
  domNode.type === 'tag';

const isComment = (domNode: DOMNode): domNode is DOMHandlerComment =>
  domNode.type === 'comment';

const toReactNode = ({ content }: { content: string }) => {
  const parserConfig: HTMLReactParserOptions = {
    replace(domNode) {
      if (isComment(domNode)) {
        const trimmedCommentValue = domNode.data.trim();

        if (trimmedCommentValue === 'REQUEST-INFO-TABS') {
          return <RequestInfoTabs />;
        }
      }

      if (!isElement(domNode)) return;

      const attribs: Partial<typeof domNode.attribs> = domNode.attribs;

      switch (domNode.name) {
        // use `next/link` for internal-links
        case 'a': {
          const { href: rawHref, 'data-internal-link': dataInternalLink } =
            attribs;

          if (rawHref && dataInternalLink === 'true') {
            /** Root-relative path. */
            let href: string | undefined;

            if (
              rawHref.startsWith('https://') ||
              rawHref.startsWith('http://') ||
              rawHref.startsWith('//')
            ) {
              // `rawHref` *should* come in as an absolute path, so this code should be executed
              href = `/${rawHref.split('/').slice(3).join('/')}`;
            } else if (rawHref.startsWith('/')) {
              // in case `rawHref` arrives as a root-relative path already (it shouldn't)
              href = rawHref;
            } else {
              // otherwise, do nothing (though we can come back and add other conditions if needed)
              return;
            }

            delete attribs.href;
            return (
              <Link href={href}>{domToReact([domNode], parserConfig)}</Link>
            );
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
}

const ParsedMarkup = ({ content }: Props) => {
  const parsedContent = toReactNode({ content });

  return parsedContent;
};

export default ParsedMarkup;
