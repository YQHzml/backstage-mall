import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import Modal from "./modal";
import axios from "../../util/http";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button } from "antd";

function PageTwo() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal组件");
  const [modalText, setModalText] = useState("内容区域");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef();
  console.log(titleInputRef.current);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);

    // setTimeout(() => {
    //   titleInputRef.current.focus();
    // }, 0);
  };
  useEffect(() => {
    if (isEditingTitle) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 0);
    }
  }, [isEditingTitle]);

  const handleTitleChange = (e) => {
    setModalTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleConfirm = async () => {
    try {
      // 发起POST请求
      // const response = await axios.post(
      //   "http://127.00.1:4000/api/tasks",
      //   requestData
      // );

      await axios.post("http://127.0.0.2:4000/api/tasks").then((response) => {
        // 请求成功后的处理逻辑
        const { title, text } = response.data.data;
        console.log(title, text);
        setModalTitle(title);
        setModalText(text);
        if (modalTitle || modalText) {
          closeModal();
        }
      });
    } catch (error) {
      // 请求失败后的处理逻辑
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      titleInputRef.current?.blur();
    }
  };

  return (
    <div>
      <Button onClick={openModal}>打开Modal</Button>
      <Modal showModal={showModal} setShowModal={closeModal}>
        {isEditingTitle ? (
          <ProFormText
            value={modalTitle}
            className={styles.title_input}
            fieldProps={{
              onBlur: handleTitleBlur,
              onKeyUp: handleKeyDown,
              onChange: handleTitleChange,
              ref: titleInputRef,
            }}
          />
        ) : (
          <h2 onClick={handleTitleClick} className={styles.title}>
            {modalTitle}
          </h2>
        )}
        <ProFormTextArea
          value={modalText}
          onChange={(e) => setModalText(e.target.value)}
          className={styles.text_input}
        />
        <div style={{ marginTop: 100 }}>
          <Button
            onClick={handleConfirm}
            style={{ width: 60, height: 30, marginRight: 20 }}
          >
            确认
          </Button>
          <Button
            onClick={closeModal}
            style={{ width: 60, height: 30, marginRight: 20 }}
          >
            取消
          </Button>
        </div>
      </Modal>
      <ProForm
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProFormText label="姓名" name="name" />
      </ProForm>
    </div>
  );
}

export default PageTwo;
