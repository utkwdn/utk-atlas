import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SlateFormEmbed from 'components/SlateFormEmbed';
import styles from 'scss/components/PageTitle.module.scss';

function VisitModalButton() {
  const [showModal, setShowModal] = useState(false);
  const [chosenFormId, setChosenFormId] = useState('');
  const [chosenFormUrl, setChosenFormUrl] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setChosenFormId('');
      setChosenFormUrl('');
    }, 500);
  };
  const handleShowModal = (e: any) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleFormChoice = (e: any, formChoice: string) => {
    e.preventDefault();

    const UNDERGRAD_ID = 'e20f8349-6ef3-4b8c-b48d-f25ef6174c8d';
    const GRAD_ID = '5880822a-64f0-4764-bca2-5f401da0fb37';
    const UNDERGRAD_URL = `govols.utk.edu`;
    const GRAD_URL = `apply.gradschool.utk.edu`;

    setChosenFormUrl(formChoice === 'undergrad' ? UNDERGRAD_URL : GRAD_URL);
    setChosenFormId(formChoice === 'undergrad' ? UNDERGRAD_ID : GRAD_ID);
  };
  return (
    <>
      <div className="is-layout-flex wp-block-buttons">
        <div className="wp-block-button is-style-outline">
          <a
            className="wp-block-button__link wp-element-button"
            href="#"
            onClick={(e) => handleShowModal(e)}
          >
            Request Info
          </a>
        </div>
      </div>
      <Modal
        size={chosenFormId === '' ? 'lg' : 'xl'}
        show={showModal}
        onHide={handleCloseModal}
        centered={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {chosenFormId !== '' ? (
            <div>
              <SlateFormEmbed
                id={chosenFormId}
                scriptSrc={
                  `https://${chosenFormUrl}/register/?id=${chosenFormId}&output=embed&div=form_${chosenFormId}` +
                  (location.search.length > 1
                    ? '&' + location.search.substring(1)
                    : '')
                }
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                paddingBottom: '40px',
              }}
            >
              <h4>GET INFORMATION ON VISITING UT FOR:</h4>
              <div
                className="is-layout-flex wp-block-buttons"
                style={{ marginBottom: '20px', marginTop: '10px' }}
              >
                <div className="wp-block-button is-style-outline">
                  <a
                    className="wp-block-button__link wp-element-button"
                    href="#"
                    onClick={(e) => handleFormChoice(e, 'undergrad')}
                  >
                    Incoming undergraduate or transfers
                  </a>
                </div>
              </div>
              <div className="is-layout-flex wp-block-buttons">
                <div className="wp-block-button is-style-outline">
                  <a
                    className="wp-block-button__link wp-element-button"
                    href="#"
                    onClick={(e) => handleFormChoice(e, 'grad')}
                  >
                    Incoming graduate students
                  </a>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VisitModalButton;
