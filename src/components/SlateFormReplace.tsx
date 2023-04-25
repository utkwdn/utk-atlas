import { useState, useEffect, useRef } from 'react';
import styles from 'scss/components/SlateForm.module.scss';

import SlateFormEmbed from './SlateFormEmbed';

interface Props {
  commentString: string;
}

interface SlateData {
  scriptSrc: string;
  modal: boolean;
  buttonText?: string;
  buttonStyle?: string;
}
interface KeyboardEvent {
  keyCode: number;
}

// function YoutubeCarousel({ cardWidth, cardMargin }: Props): JSX.Element {
function SlateFormReplace({ commentString }: Props): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [slateId, setSlateId] = useState('');
  const [slateScriptSrc, setSlateScriptSrc] = useState('');
  const [slateButtonText, setSlateButtonText] = useState('');
  const [slateButtonStyle, setSlateButtonStyle] = useState('');
  const [useModal, setUseModal] = useState(false);
  const [modalOpacity, setModalOpacity] = useState(0);

  const handleCloseModal = () => {
    // Fade out with opacity before hiding
    setModalOpacity(0);
    setTimeout(() => {
      setShowModal(false);
    }, 220);
    // Re-enable <html> scrolling
    document.documentElement.style.removeProperty('overflow-y');
  };
  const handleShowModal = () => {
    // Show, then fade in with opacity
    setShowModal(true);
    setTimeout(() => {
      setModalOpacity(1);
    }, 20);
    // Hide overflow on <html> element to prevent scrolling background instead of modal content
    document.documentElement.style.overflowY = 'hidden';
  };

  const escCloseModal = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const hasData = commentString.match(/\[(.*?)\]/);

    document.addEventListener('keydown', escCloseModal);

    if (hasData) {
      const slateRawData = hasData[1];
      const slateDataObject = JSON.parse(slateRawData) as SlateData;

      if (slateDataObject.scriptSrc) {
        const splitSlateId = slateDataObject.scriptSrc.split('div=form_')[1];
        setSlateScriptSrc(slateDataObject.scriptSrc);
        setSlateId(splitSlateId);
      }

      if (slateDataObject.modal && slateDataObject.modal === true) {
        setUseModal(true);
        setSlateButtonText(slateDataObject.buttonText || 'No button text');
        setSlateButtonStyle(slateDataObject.buttonStyle || 'fancy');
      }

      return () => {
        document.removeEventListener('keydown', escCloseModal);
      };
    } else {
      console.log('No form data found');
    }
  }, [showModal, escCloseModal]);

  return slateId === '' ? (
    <></>
  ) : (
    <>
      {useModal ? (
        <>
          {slateButtonStyle === 'fancy' ? (
            <div className="is-layout-flex wp-block-buttons">
              <p className="fancyLink">
                <a href="#" onClick={() => handleShowModal()}>
                  {slateButtonText}
                </a>
              </p>
            </div>
          ) : (
            <div className="wp-block-button is-style-outline">
              <a
                className="wp-block-button__link wp-element-button"
                onClick={() => handleShowModal()}
              >
                {slateButtonText}
              </a>
            </div>
          )}

          <div
            style={{
              display: showModal ? 'block' : 'none',
              opacity: modalOpacity,
            }}
            className={`${styles['slate-modal-container']}`}
          >
            <div
              className={styles['slate-modal-backdrop']}
              onClick={() => handleCloseModal()}
            ></div>
            <div className={styles['slate-dialog-container']}>
              <div className={styles['slate-dialog']}>
                <div className={styles['slate-modal-header']}>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => handleCloseModal()}
                  ></button>
                </div>
                <div className={styles['slate-modal-body']}>
                  <SlateFormEmbed
                    id={slateId}
                    scriptSrc={
                      slateScriptSrc +
                      (location.search.length > 1
                        ? '&' + location.search.substring(1)
                        : '')
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <SlateFormEmbed
            id={slateId}
            scriptSrc={
              slateScriptSrc +
              (location.search.length > 1
                ? '&' + location.search.substring(1)
                : '')
            }
          />
        </>
      )}
    </>
  );
}

export default SlateFormReplace;
