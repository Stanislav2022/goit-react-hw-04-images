import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import css from "./Modal.module.css"
import PropTypes from 'prop-types';


const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal)
  }

  closeModal = ({ target, currentTarget, code }) => {
    console.log(code);
    if (target === currentTarget || code === "Escape") {
      this.props.onClose();
      }

  }
  render() {
    const { children } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
             {children}
         </div>
        </div>,
        modalRoot
     )
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

