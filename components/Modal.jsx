import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app-modal')

const HomeModal = () => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 className="text-xl mb-4">Welcome to our site!</h2>
        <p>This site is currently in development and may change, not all products are currently listed.</p>
        <p className="mt-2">Please feel free to browse but you will not be able to buy anything at the moment.</p>
        <p className="mt-2">We look forward to opening the site up fully very soon.</p>
        <button onClick={closeModal} className="bg-fabred text-white mt-4 rounded p-2">Close</button>
      </Modal>
    </div>
  );
}

export default HomeModal