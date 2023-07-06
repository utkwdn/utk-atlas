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

const toReactNode = ({
  content,
  collectSlateFormInfo,
  elevateSlateButtonClick,
}: {
  content: string;
  collectSlateFormInfo: ((object: object) => void) | false;
  elevateSlateButtonClick: ((modalId: string) => void) | undefined;
}) => {
  const handleSlateButtonClick = (modalId: string) => {
    if (elevateSlateButtonClick) {
      elevateSlateButtonClick(modalId);
    }
  };

  const capButtonText = (buttonText: string) => {
    const wordArray = buttonText.split(' ');
    const cappedText = wordArray
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    return cappedText;
  };

  const processFormInfo = (
    attribs: Partial<{ [name: string]: string }>,
    buttonText: string
  ) => {
    interface formData {
      title: string;
      scriptSrc: string;
    }

    const modalTitle = capButtonText(buttonText);

    if (attribs['data-forminfo']) {
      // Parse data-forminfo text into array
      const inputFormInfoArray = JSON.parse(attribs['data-forminfo']) as [
        formData
      ];
      const processedObject: { [key: string]: object } = {};
      const outputFormInfoArray: object[] = [];
      let formInfoId = '';

      // Loop through form info array and organize data
      inputFormInfoArray.forEach((formObject: formData) => {
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

      // format data as { 'uniqueId': {modalTitle: 'title', formInfo: [formInfo]} }
      processedObject[formInfoId] = {
        modalTitle: modalTitle,
        formInfo: outputFormInfoArray,
      };

      // Pass formatted data to parent (ParsedMarkup)
      if (collectSlateFormInfo) {
        collectSlateFormInfo(processedObject);
      }

      return formInfoId;
    }
  };

  const parserConfig: HTMLReactParserOptions = {
    replace(domNode) {
      if (isComment(domNode)) {
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

        if (trimmedCommentValue.includes('SLATE-FORM')) {
          return <SlateFormReplace commentString={trimmedCommentValue} />;
        }

        if (trimmedCommentValue.includes('SLATE-MODAL-TABS')) {
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

            // Save form info and return unique key to target modal
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
  elevateFormInfo?: (object: object) => void;
  elevateSlateButtonClick?: (modalId: string) => void;
}

const ParsedMarkup = ({
  content,
  elevateFormInfo,
  elevateSlateButtonClick,
}: Props) => {
  const [slateFormInfo, setSlateFormInfo] = useState<object | boolean>(false);

  const collectSlateFormInfo = (object: object) => {
    // If some form info has already been saved, append new info to existing object
    if (typeof slateFormInfo === 'object') {
      const newObjectKey: string = Object.keys(object)[0];
      // Check that form group doesn't already exist before adding
      // Allows multiple buttons that open the same modal on a page
      if (!(newObjectKey in slateFormInfo)) {
        const oldSlateFormInfo = slateFormInfo;
        const newSlateFormInfo = Object.assign(oldSlateFormInfo, object);
        setSlateFormInfo(newSlateFormInfo);
      }
      // If no form info has been saved, save as an object ( format: { uniqueId: {formInfo} } )
    } else {
      setSlateFormInfo(object);
    }
  };

  // Making sure ParsedMarkup has finished rendering before passing data to page component
  useEffect(() => {
    if (elevateFormInfo && typeof slateFormInfo === 'object') {
      elevateFormInfo(slateFormInfo);
    }
  }, [slateFormInfo, elevateFormInfo]);

  const parsedContent = toReactNode({
    content,
    collectSlateFormInfo,
    elevateSlateButtonClick,
  });

  return parsedContent;
};

export default ParsedMarkup;
