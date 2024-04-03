import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import axios from "../../util/http";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button } from "antd";
// 测试
import Modal from "./components/modal";
import Child from "./components/child";
import AntdPro from "./components/antdPro";

const PageTwo = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal组件");
  const [modalText, setModalText] = useState("内容区域");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [parentCount, setParentCount] = useState(0);
  const titleInputRef = useRef();
  const childRef = useRef();

  const handleClickChild = () => {
    childRef.current.handleClick();
  };

  const handleClickParent = () => {
    setParentCount((prev) => prev + 1);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
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
      await axios.post("http://127.0.0.2:4000/api/tasks").then((response) => {
        // 请求成功后的处理逻辑
        const { title, text } = response.data.data;
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
          <ProForm submitter={false}>
            <ProFormText
              width="sm"
              value={modalTitle}
              className={styles.title_input}
              fieldProps={{
                onBlur: handleTitleBlur,
                onKeyUp: handleKeyDown,
                onChange: handleTitleChange,
                ref: titleInputRef,
              }}
            />
          </ProForm>
        ) : (
          <h2 onClick={handleTitleClick} className={styles.title}>
            {modalTitle}
          </h2>
        )}
        <span className={styles.close} onClick={closeModal}>
          X
        </span>
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
      <br />
      {/* 父子组件通信 */}
      <Child ref={childRef} handleClickParent={handleClickParent} />
      <Button onClick={handleClickChild}>父组件:{parentCount}</Button>
      {/* antdPro组件 */}
      <AntdPro />
    </div>
  );
};

export default PageTwo;
