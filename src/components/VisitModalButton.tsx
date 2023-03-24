import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from 'scss/components/ModalButton.module.scss';

function VisitModalButton() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="is-layout-flex wp-block-buttons">
        <p className="fancyLink">
          <a href="#" onClick={() => handleShowModal()}>
            Request visit info
          </a>
        </p>
      </div>
      <Modal
        size={'lg'}
        show={showModal}
        onHide={handleCloseModal}
        centered={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
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
                  href="/undergraduate-tours"
                >
                  Undergraduate visit
                </a>
              </div>
              <div className="wp-block-button is-style-outline">
                <a
                  className="wp-block-button__link wp-element-button"
                  href="/graduate-tours"
                >
                  Graduate visit
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VisitModalButton;
