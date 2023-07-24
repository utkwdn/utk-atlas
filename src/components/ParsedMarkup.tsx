import parse, {
  type HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element as DOMHandlerElement,
  Comment as DOMHandlerComment,
} from 'html-react-parser';

import Link from 'next/link';
import HomepageVideo from './HomepageVideo';
import ApplyPageVideo from './ApplyPageVideo';
import RequestInfoTabs from './RequestInfoTabs';
import YoutubeCarousel from './YoutubeCarousel';
import VisitModalButton from './VisitModalButton';
import GraduateToursModal from './GraduateToursModal';
import SlateFormReplace from './SlateFormReplace';
import SlateModalTabs from './SlateModalTabs';
import { useEffect, useState } from 'react';
// import Image from 'next/image';

// workaround b/c of this bug: https://github.com/remarkablemark/html-react-parser/issues/633
const isElement = (domNode: DOMNode): domNode is DOMHandlerElement =>
  domNode.type === 'tag';

const isComment = (domNode: DOMNode): domNode is DOMHandlerComment =>
  domNode.type === 'comment';

interface FormInfoInnerObject {
  tabTitle: string;
  formId: string;
  scriptSrc: string;
}
interface FormInfoObject {
  modalId: string;
  modalTitle: string;
  formInfo: FormInfoInnerObject[];
}

const toReactNode = ({
  content,
  collectSlateFormInfo,
  elevateSlateButtonClick,
  dynamicSrc,
}: {
  content: string;
  collectSlateFormInfo: ((formInfo: FormInfoObject) => void) | false;
  elevateSlateButtonClick: ((modalId: string) => void) | undefined;
  dynamicSrc: string | undefined;
}) => {
  const handleSlateButtonClick = (modalId: string) => {
    if (elevateSlateButtonClick) {
      elevateSlateButtonClick(modalId);
    }
  };

  // Returns Capitalized text from button to use as modal title
  const capButtonText = (buttonText: string) => {
    const wordArray = buttonText.split(' ');
    const cappedText = wordArray
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    return cappedText;
  };

  // Parse form info string and organize data for mapping to SlateModal component
  // Also returns formInfoId for button's onClick functionality
  const processFormInfo = (
    attribs: Partial<{ [name: string]: string }>,
    buttonText: string
  ) => {
    interface FormData {
      title: string;
      scriptSrc: string;
    }

    const modalTitle = capButtonText(buttonText);

    if (attribs['data-forminfo']) {
      // Parse data-forminfo text into array
      const inputFormInfoArray = JSON.parse(attribs['data-forminfo']) as [
        FormData
      ];
      const outputFormInfoArray: FormInfoInnerObject[] = [];
      let formInfoId = '';

      // Loop through form info array and organize data
      inputFormInfoArray.forEach((formObject: FormData) => {
        const formId = formObject.scriptSrc.split('div=form_')[1];
        outputFormInfoArray.push({
          tabTitle: formObject.title,
          formId: formId,
          scriptSrc: formObject.scriptSrc,
        });
        // combine form IDs to create unique key
        if (formInfoId === '') {
          formInfoId = formId;
        } else {
          formInfoId += `&${formId}`;
        }
      });

      // Pass formatted data to parent (ParsedMarkup)
      if (collectSlateFormInfo) {
        collectSlateFormInfo({
          modalId: formInfoId,
          modalTitle: modalTitle,
          formInfo: outputFormInfoArray,
        });
      }

      return formInfoId;
    }
  };

  const parserConfig: HTMLReactParserOptions = {
    replace(domNode) {
      if (isComment(domNode)) {
        const trimmedCommentValue = domNode.data.trim();

        if (trimmedCommentValue === 'REQUEST-INFO-TABS') {
          console.log('request info tabs');
          return <RequestInfoTabs />;
        }

        if (trimmedCommentValue === 'VISIT-YOUTUBE-CAROUSEL') {
          console.log('visit youtube carousel');
          return <YoutubeCarousel cardWidth={828} cardMargin={20} />;
        }

        // if (trimmedCommentValue === 'VISIT-MODAL-BUTTON') {
        //   console.log('visit modal button');
        //   return <VisitModalButton />;
        // }

        // if (trimmedCommentValue === 'GRADUATE-TOURS-MODAL') {
        //   console.log('graduate tours modal');
        //   return <GraduateToursModal />;
        // }

        if (trimmedCommentValue.includes('SLATE-FORM')) {
          console.log('slate form replace');
          return <SlateFormReplace commentString={trimmedCommentValue} />;
        }

        if (trimmedCommentValue.includes('SLATE-MODAL-TABS')) {
          console.log('slate modal tabs');
          return <SlateModalTabs commentString={trimmedCommentValue} />;
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
          // Handle Slate Form Button (class='slateFormButton')
          if (
            attribs.class?.includes('slateFormButton') &&
            attribs['data-forminfo']
          ) {
            const buttonText = domNode.firstChild
              ? (domToReact([domNode.firstChild]) as string)
              : 'Button text';

            // Save form info and return unique key to target modal onClick
            const modalId: string = processFormInfo(attribs, buttonText) || '';

            return (
              <a
                role="button"
                className={attribs.class}
                onClick={() => handleSlateButtonClick(modalId)}
              >
                {buttonText}
              </a>
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

          // insert ApplyPageVideo (target is `div.applyPageVideo`)
          if (outerDivClasses && /\bapplyPageVideo\b/g.test(outerDivClasses)) {
            const figure = domNode.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.name === 'figure'
            );

            if (!figure) {
              console.error(
                'The `div.applyPageVideo` did not have the expected child-figure.'
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
                'The `figure` in `div.applyPageVideo` did not have the expected child-div.'
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
                'The child-div of the child-figure of `div.applyPageVideo` did not have the expected child-img.'
              );
              return;
            }

            const imgAttribs: Partial<typeof img.attribs> = img.attribs;

            if (!imgAttribs.src) {
              console.error(
                'The `img` in `figure.applyPageVideo` is missing a `src`.'
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
              <ApplyPageVideo
                outerDivClasses={outerDivClasses}
                figureClasses={figureClasses}
                innerDivClasses={innerDivClasses}
                imgAttributes={imgAttribs}
              />
            );
          }
          // Dynamic Content
          if (outerDivClasses && /\bdynamic-content\b/g.test(outerDivClasses)) {
            const dynamicKey = dynamicSrc || 'no-dynamic-key';
            const defaultDiv = domNode.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.attribs.class.includes('default')
            );
            const matchingDiv = domNode.children.find(
              (child): child is DOMHandlerElement =>
                isElement(child) && child.attribs.class.includes(dynamicKey)
            );

            if (matchingDiv) {
              return <>{domToReact([matchingDiv], parserConfig)}</>;
            } else if (defaultDiv) {
              return <>{domToReact([defaultDiv], parserConfig)}</>;
            } else {
              return (
                <>
                  <p>No Default Content Set</p>
                </>
              );
            }
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
  // Function to save form info to page component
  elevateFormInfo?: (formInfo: FormInfoObject[]) => void;
  // Function to display modal on page component
  elevateSlateButtonClick?: (modalId: string) => void;
  // Dynamic key from URL param, if set (e.g. ?src=campus-visit)
  dynamicSrc?: string;
}

const ParsedMarkup = ({
  content,
  elevateFormInfo,
  elevateSlateButtonClick,
  dynamicSrc,
}: Props) => {
  const [slateFormInfo, setSlateFormInfo] = useState<FormInfoObject[]>([]);
  const [savedFormIds, setSavedFormIds] = useState<string[]>([]);

  const collectSlateFormInfo = (formInfo: FormInfoObject) => {
    const oldSlateFormInfo = slateFormInfo;
    const oldSavedFormIds = savedFormIds;

    if (!oldSavedFormIds.includes(formInfo.modalId)) {
      oldSlateFormInfo.push(formInfo);
      oldSavedFormIds.push(formInfo.modalId);
      setSlateFormInfo(oldSlateFormInfo);
      setSavedFormIds(oldSavedFormIds);
    }
  };

  // Making sure ParsedMarkup has finished rendering before passing data to page component
  useEffect(() => {
    if (elevateFormInfo && slateFormInfo.length > 0) {
      elevateFormInfo(slateFormInfo);
    }
  }, [slateFormInfo, elevateFormInfo]);

  const parsedContent = toReactNode({
    content,
    collectSlateFormInfo,
    elevateSlateButtonClick,
    dynamicSrc,
  });

  return parsedContent;
};

export default ParsedMarkup;
