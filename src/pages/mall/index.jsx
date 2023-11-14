import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const { Column } = Table;

function Mall() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newUser = {
          id: users.length + 1,
          name: values.name,
          email: values.email,
        };
        setUsers([...users, newUser]);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<UserAddOutlined />}>
        添加用户
      </Button>

      <Modal
        title="添加用户"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={users}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="邮箱" dataIndex="email" key="email" />
      </Table>
    </div>
  );
}

export default Mall;
