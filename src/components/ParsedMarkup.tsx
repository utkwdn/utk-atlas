/*
  Some potentially useful imports (based on past experience) are commented out here.
  Uncomment them as needed.
*/

// import { isText } from 'domhandler';
import parse, {
  type HTMLReactParserOptions,
  // domToReact,
  // Element as DOMHandlerElement,
  // Node as DOMHandlerNode,
} from 'html-react-parser';

/* In case we want to use these built-in Next.js components. */

// import Link from 'next/link';
// import Image from 'next/image';

const parserConfig: HTMLReactParserOptions = {};

interface Props {
  /** The HTML content to parse. */
  content: string;
}

const ParsedMarkup = ({ content }: Props) => {
  return <>{parse(content, parserConfig)}</>;
};

export default ParsedMarkup;
