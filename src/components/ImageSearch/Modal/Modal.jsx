import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from "./Modal.module.css"
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

export default function Modal({ largeImageURL, tags, onClose }) {
 
  useEffect(() => {
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  });
 
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === "Escape") {
      onClose()
      }
  }

  return createPortal(
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
             <img src={largeImageURL} alt={tags}/>
         </div>
        </div>,
        modalRoot
     )
};


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

