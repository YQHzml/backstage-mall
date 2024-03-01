import React from "react";
import styles from "../index.module.scss";
const Modal = ({ showModal, children }) => {
  return (
    <>
      {showModal ? (
        <div className={styles.modal}>
          <div className={styles.modal_content}>{children}</div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
