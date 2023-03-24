import { useEffect, useState, MouseEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import SlateFormEmbed from 'components/SlateFormEmbed';
import styles from 'scss/components/ModalButton.module.scss';

function VisitModalButton() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUndergradForm, setShowUndergradForm] = useState(false);
  const [showGradForm, setShowGradForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const UNDERGRAD_ID = 'e20f8349-6ef3-4b8c-b48d-f25ef6174c8d';
  const GRAD_ID = '5880822a-64f0-4764-bca2-5f401da0fb37';

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setShowUndergradForm(false);
      setShowGradForm(false);
      setShowButtons(true);
    }, 500);
  };
  const handleShowModal = (e: MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleFormChoice = (e: MouseEvent, formChoice: string) => {
    e.preventDefault();

    if (formChoice === 'undergrad') {
      setShowUndergradForm(true);
    }
    if (formChoice === 'grad') {
      setShowGradForm(true);
    }
    setShowButtons(false);
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <>
      <div className="is-layout-flex wp-block-buttons">
        <p className="fancyLink">
          <a href="#" onClick={(e) => handleShowModal(e)}>
            Request visit info
          </a>
        </p>
      </div>
      <Modal
        size={showButtons ? 'lg' : 'xl'}
        show={showModal}
        onHide={handleCloseModal}
        centered={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ display: showUndergradForm ? 'block' : 'none' }}>
            <Modal.Title>We can`&apos;`t wait to see you!</Modal.Title>
            <SlateFormEmbed
              id={UNDERGRAD_ID}
              scriptSrc={
                `https://govols.utk.edu/register/?id=${UNDERGRAD_ID}&output=embed&div=form_${UNDERGRAD_ID}` +
                (location.search.length > 1
                  ? '&' + location.search.substring(1)
                  : '')
              }
            />
          </div>
          <div style={{ display: showGradForm ? 'block' : 'none' }}>
            <Modal.Title>We can`&apos;`t wait to see you!</Modal.Title>
            <SlateFormEmbed
              id={GRAD_ID}
              scriptSrc={
                `https://apply.gradschool.utk.edu/register/?id=${GRAD_ID}&output=embed&div=form_${GRAD_ID}` +
                (location.search.length > 1
                  ? '&' + location.search.substring(1)
                  : '')
              }
            />
          </div>
          <div
            style={{
              display: showButtons ? 'flex' : 'none',
            }}
            className={styles['formChoiceButtons']}
          >
            <h2 className="h3">Request information</h2>
            <div
              className={`is-layout-flex wp-block-buttons ${styles['modalButtons']}`}
            >
              <div className="wp-block-button is-style-outline">
                <a
                  className="wp-block-button__link wp-element-button"
                  href="#"
                  onClick={(e) => handleFormChoice(e, 'undergrad')}
                >
                  Undergraduate visit
                </a>
              </div>
              <div className="wp-block-button is-style-outline">
                <a
                  className="wp-block-button__link wp-element-button"
                  href="#"
                  onClick={(e) => handleFormChoice(e, 'grad')}
                >
                  Graduate visit
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  ) : (
    <></>
  );
}

export default VisitModalButton;
