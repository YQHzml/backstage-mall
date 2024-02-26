import React from "react";
import styles from "./index.module.scss";
const Modal = ({ showModal, setShowModal, children }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={closeModal}>
              X
            </span>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
