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
import YoutubeCarousel from './YoutubeCarousel';
import VisitModalButton from './VisitModalButton';
import GraduateToursModal from './GraduateToursModal';
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
        console.log(domNode);
        const trimmedCommentValue = domNode.data.trim();

        if (trimmedCommentValue === 'REQUEST-INFO-TABS') {
          return <RequestInfoTabs />;
        }

        if (trimmedCommentValue === 'VISIT-YOUTUBE-CAROUSEL') {
          return <YoutubeCarousel cardWidth={828} cardMargin={20} />;
        }

        if (trimmedCommentValue === 'VISIT-MODAL-BUTTON') {
          return <VisitModalButton />;
        }

        if (trimmedCommentValue === 'GRADUATE-TOURS-MODAL') {
          return <GraduateToursModal />;
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
              <Link href={href} legacyBehavior>
                {domToReact([domNode], parserConfig)}
              </Link>
            );
          }
        }

        case 'div': {
          const { class: outerDivClasses } = attribs;

          // insert HomepageVideo (target is `div.homepageVideo`)
          if (outerDivClasses && /\bhomepageVideo\b/g.test(outerDivClasses)) {
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

            const figureAttribs: Partial<typeof figure.attribs> =
              figure.attribs;
            const figureClasses = figureAttribs.class;

            const innerDiv = figure.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.name === 'div'
            );

            if (!innerDiv) {
              console.error(
                'The `figure` in `div.homepageVideo` did not have the expected child-div.'
              );
              return;
            }

            const innerDivAttribs: Partial<typeof innerDiv.attribs> =
              innerDiv.attribs;
            const innerDivClasses = innerDivAttribs.class;

            const img = innerDiv.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.name === 'img'
            );

            if (!img) {
              console.error(
                'The child-div of the child-figure of `div.homepageVideo` did not have the expected child-img.'
              );
              return;
            }

            const imgAttribs: Partial<typeof img.attribs> = img.attribs;

            if (!imgAttribs.src) {
              console.error(
                'The `img` in `figure.homepageVideo` is missing a `src`.'
              );
              return;
            }

            if (imgAttribs.class) {
              imgAttribs.className = imgAttribs.class;
              delete imgAttribs.class;
            }

            if (imgAttribs.srcset) {
              imgAttribs.srcSet = imgAttribs.srcset;
              delete imgAttribs.srcset;
            }

            return (
              <HomepageVideo
                outerDivClasses={outerDivClasses}
                figureClasses={figureClasses}
                innerDivClasses={innerDivClasses}
                imgAttributes={imgAttribs}
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
