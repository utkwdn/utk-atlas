import { useEffect, useState, MouseEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import SlateFormEmbed from 'components/SlateFormEmbed';

function VisitModalButton() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const GRAD_ID = '5880822a-64f0-4764-bca2-5f401da0fb37';

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (e: MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <>
      <div className="is-content-justification-right is-layout-flex wp-container-3 wp-block-buttons">
        <div className="wp-block-button is-style-outline">
          <a
            className="wp-block-button__link wp-element-button"
            href="https://admissions.utk.edu/visit/campus-tours/"
          >
            Undergraduate tours
          </a>
        </div>

        <div className="wp-block-button is-style-outline">
          <a
            className="wp-block-button__link wp-element-button"
            onClick={(e) => handleShowModal(e)}
          >
            Graduate tours
          </a>
        </div>
      </div>
      <Modal
        size={'xl'}
        show={showModal}
        onHide={handleCloseModal}
        centered={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title>Tell us about yourself!</Modal.Title>
          <SlateFormEmbed
            id={GRAD_ID}
            scriptSrc={
              `https://apply.gradschool.utk.edu/register/?id=${GRAD_ID}&output=embed&div=form_${GRAD_ID}` +
              (location.search.length > 1
                ? '&' + location.search.substring(1)
                : '')
            }
          />
        </Modal.Body>
      </Modal>
    </>
  ) : (
    <></>
  );
}

export default VisitModalButton;
