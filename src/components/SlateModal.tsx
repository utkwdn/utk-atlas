import { useState, useEffect, useRef } from 'react';
import styles from 'scss/components/SlateForm.module.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SlateFormEmbed from './SlateFormEmbed';

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
interface Props {
  formInfo: FormInfoObject;
  clickedModalId: string;
  trigger: number;
}

interface KeyboardEvent {
  keyCode: number;
}

// function YoutubeCarousel({ cardWidth, cardMargin }: Props): JSX.Element {
function SlateModal({ formInfo, clickedModalId, trigger }: Props): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [modalOpacity, setModalOpacity] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setModalOpacity(0);
    setShowModal(false);
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

  useEffect(() => {
    const escCloseModal = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        handleCloseModal();
      }
    };

    if (trigger && formInfo.modalId === clickedModalId) {
      handleShowModal();
      setTimeout(() => {
        modalRef.current?.focus();
      }, 20);
    }

    document.addEventListener('keydown', escCloseModal);

    return () => {
      document.removeEventListener('keydown', escCloseModal);
    };
  }, [trigger, clickedModalId, formInfo.modalId]);

  return (
    <>
      <div
        style={{
          display: showModal ? 'block' : 'none',
          opacity: modalOpacity,
        }}
        className={`${styles['slate-modal-container']}`}
        ref={modalRef}
        id={formInfo.modalId}
        tabIndex={0}
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
              <h3 className={styles['heading-text']}>{formInfo.modalTitle}</h3>
              {/* If multiple forms, use tabs. Otherwise embed directly */}
              {formInfo.formInfo.length > 1 ? (
                <Tabs className="nav nav-pills justify-content-center justify-content-lg-start">
                  {formInfo.formInfo.map((thisForm, i) => {
                    return (
                      <Tab
                        key={i}
                        title={thisForm.tabTitle}
                        eventKey={thisForm.tabTitle}
                        className="nav-item my-4"
                      >
                        <SlateFormEmbed
                          id={thisForm.formId}
                          scriptSrc={
                            thisForm.scriptSrc +
                            (location.search.length > 1
                              ? '&' + location.search.substring(1)
                              : '')
                          }
                        />
                      </Tab>
                    );
                  })}
                </Tabs>
              ) : (
                <SlateFormEmbed
                  id={formInfo.formInfo[0].formId}
                  scriptSrc={
                    formInfo.formInfo[0].scriptSrc +
                    (location.search.length > 1
                      ? '&' + location.search.substring(1)
                      : '')
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlateModal;
