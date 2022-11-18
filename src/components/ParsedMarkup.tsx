// import { isText } from 'domhandler';
import parse, {
  type HTMLReactParserOptions,
  domToReact,
  Element as DOMHandlerElement,
  DOMNode,
} from 'html-react-parser';

import Link from 'next/link';
// import Image from 'next/image';

// workaround b/c of this bug: https://github.com/remarkablemark/html-react-parser/issues/633
const isElement = (domNode: DOMNode): domNode is DOMHandlerElement =>
  domNode.type === 'tag';

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
          return <Link href={href}>{domToReact([domNode], parserConfig)}</Link>;
        }
      }
    }
  },
};

interface Props {
  /** The HTML content to parse. */
  content: string;
}

const ParsedMarkup = ({ content }: Props) => (
  <>{parse(content, parserConfig)}</>
);

export default ParsedMarkup;
