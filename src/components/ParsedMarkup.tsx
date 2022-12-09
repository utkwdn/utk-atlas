import parse, {
  type HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element as DOMHandlerElement,
  Comment as DOMHandlerComment,
} from 'html-react-parser';

import Link from 'next/link';
import HomepageVideo from './HomepageVideo';
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

        case 'div': {
          const { class: className } = attribs;

          // insert HomepageVideo (target is `div.homepageVideo`)
          if (className && /\bhomepageVideo\b/g.test(className)) {
            const figure = domNode.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.name === 'figure'
            );

            if (!figure) {
              console.error(
                'The `div.homepageVideo` did not have the expected child-figure.'
              );
              return;
            }

            const div = figure.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.name === 'div'
            );

            if (!div) {
              console.error(
                'The `figure` in `div.homepageVideo` did not have the expected child-div.'
              );
              return;
            }

            const img = div.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.name === 'img'
            );

            if (!img) {
              console.error(
                'The child-div of the child-figure of `div.homepageVideo` did not have the expected child-img.'
              );
              return;
            }

            if (!img.attribs.src) {
              console.error(
                'The `img` in `figure.homepageVideo` is missing a `src`.'
              );
              return;
            }

            if (img.attribs.class) {
              img.attribs.className = img.attribs.class;
              delete img.attribs.class;
            }

            if (img.attribs.srcset) {
              img.attribs.srcSet = img.attribs.srcset;
              delete img.attribs.srcset;
            }

            return (
              <HomepageVideo
                imgAttributes={img.attribs}
                figureClasses={className}
                innerDivClasses={div.attribs.class}
                outerDivClasses={domNode.attribs.class}
              />
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
