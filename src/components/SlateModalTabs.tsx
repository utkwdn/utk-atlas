import { useState, useEffect, useRef } from 'react';
import styles from 'scss/components/SlateForm.module.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SlateFormEmbed from './SlateFormEmbed';

interface Props {
  commentString: string;
}

interface SlateData {
  buttonText: string;
  buttonStyle: string;
  tabOneTitle: string;
  tabOneScriptSrc: string;
  tabTwoTitle: string;
  tabTwoScriptSrc: string;
}
interface KeyboardEvent {
  keyCode: number;
}

// <!-- SLATE-MODAL-TABS [{"buttonText":"Request info", "buttonStyle": "fancy", "tabOneTitle": "Undergraduate Information",
// "tabOneScriptSrc":"https://apply.gradschool.utk.edu/register/?id=5880822a-64f0-4764-bca2-5f401da0fb37&output=embed&div=form_5880822a-64f0-4764-bca2-5f401da0fb37",
// "tabTwoTitle": "Graduate Information",
// "tabTwoScriptSrc":"https://govols.utk.edu/register/?id=e20f8349-6ef3-4b8c-b48d-f25ef6174c8d&output=embed&div=form_e20f8349-6ef3-4b8c-b48d-f25ef6174c8d"}] -->

// function YoutubeCarousel({ cardWidth, cardMargin }: Props): JSX.Element {
function SlateFormReplace({ commentString }: Props): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [slateOneId, setSlateOneId] = useState('');
  const [slateTwoId, setSlateTwoId] = useState('');
  const [slateOneScriptSrc, setSlateOneScriptSrc] = useState('');
  const [slateTwoScriptSrc, setSlateTwoScriptSrc] = useState('');
  const [slateOneTitle, setSlateOneTitle] = useState('');
  const [slateTwoTitle, setSlateTwoTitle] = useState('');
  const [slateButtonText, setSlateButtonText] = useState('');
  const [slateButtonStyle, setSlateButtonStyle] = useState('');
  const [modalOpacity, setModalOpacity] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    // Re-enabling .framedOrangeShadow class
    if (modalRef?.current) {
      const modalParent = modalRef.current.parentElement;
      const modalGrandparent = modalParent?.parentElement;
      modalParent?.classList.replace(
        'framedOrangeShadowDisabled',
        'framedOrangeShadow'
      );
      if (modalGrandparent) {
        modalGrandparent.classList.remove('modal-parent-container');
      }
    }

    setModalOpacity(0);
    setShowModal(false);
    // Re-enable <html> scrolling
    document.documentElement.style.removeProperty('overflow-y');
  };
  const handleShowModal = () => {
    // Disabling .framedOrangeShadow class because transforms prevent fixed position modal from displaying correctly
    if (modalRef?.current) {
      const modalParent = modalRef.current.parentElement;
      const modalGrandparent = modalParent?.parentElement;
      modalParent?.classList.replace(
        'framedOrangeShadow',
        'framedOrangeShadowDisabled'
      );
      if (modalGrandparent) {
        modalGrandparent.classList.add('modal-parent-container');
      }
    }
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

      if (slateDataObject.tabOneScriptSrc && slateDataObject.tabTwoScriptSrc) {
        const slateOneId =
          slateDataObject.tabOneScriptSrc.split('div=form_')[1];
        const slateTwoId =
          slateDataObject.tabTwoScriptSrc.split('div=form_')[1];
        setSlateOneScriptSrc(slateDataObject.tabOneScriptSrc);
        setSlateOneId(slateOneId);
        setSlateTwoScriptSrc(slateDataObject.tabTwoScriptSrc);
        setSlateTwoId(slateTwoId);
      }

      setSlateButtonText(slateDataObject.buttonText || 'No button text');
      setSlateButtonStyle(slateDataObject.buttonStyle || 'fancy');
      setSlateOneTitle(slateDataObject.tabOneTitle || 'No Title');
      setSlateTwoTitle(slateDataObject.tabTwoTitle || 'No Title');

      return () => {
        document.removeEventListener('keydown', escCloseModal);
      };
    } else {
      console.log('No form data found');
    }
  }, [showModal, escCloseModal]);

  return slateOneId === '' || slateTwoId === '' ? (
    <></>
  ) : (
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
        ref={modalRef}
      >
        <div
          className={styles['slate-modal-backdrop']}
          onClick={() => handleCloseModal()}
        ></div>
        <div className={styles['slate-dialog-container']}>
          <div
            className={styles['slate-dialog']}
            style={{ background: '#ffffff' }}
          >
            <div className={styles['slate-modal-header']}>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => handleCloseModal()}
              ></button>
            </div>
            <div className={styles['slate-modal-body']}>
              <h3 style={{ marginTop: 0 }}>Request Info</h3>
              <p>
                We&apos;re excited you want to know more about the University of
                Tennessee! Let us know what kind of information you&apos;re
                looking for by choosing one of the options below.
              </p>
              {/* TABS  */}
              <Tabs className="nav nav-pills justify-content-center justify-content-lg-start">
                <Tab
                  title={slateOneTitle}
                  eventKey="undergraduate"
                  className="nav-item my-4"
                >
                  <SlateFormEmbed
                    id={slateOneId}
                    scriptSrc={
                      slateOneScriptSrc +
                      (location.search.length > 1
                        ? '&' + location.search.substring(1)
                        : '')
                    }
                  />
                </Tab>
                <Tab
                  title={slateTwoTitle}
                  eventKey="graduate"
                  className="nav-item my-4"
                >
                  <SlateFormEmbed
                    id={slateTwoId}
                    scriptSrc={
                      slateTwoScriptSrc +
                      (location.search.length > 1
                        ? '&' + location.search.substring(1)
                        : '')
                    }
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlateFormReplace;
