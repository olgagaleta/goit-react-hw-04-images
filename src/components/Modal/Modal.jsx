import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ closeModal, largeImageURL }) {
  const handleKeyDown = e => e.code === 'Escape' && closeModal();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const body = document.querySelector('body');
      body.style.overflow = 'auto';
    };
  });

  const handleBackdropClick = ({ target, currentTarget }) => {
    target === currentTarget && closeModal();
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdropClick: PropTypes.func,
};
