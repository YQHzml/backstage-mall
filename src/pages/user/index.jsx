import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Table,
  Popconfirm,
  Button,
  Modal,
  Input,
  DatePicker,
  Typography,
  InputNumber,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  get_user_list,
  select_user_list,
  select_user_loading,
} from "@/store/slice/user";
import { Random } from "mockjs";
import moment from "moment";
import Search from "./userComponents/Search";
import styles from "./index.module.scss";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function User() {
  const dispatch = useAppDispatch();
  const user_list = useAppSelector(select_user_list);
  const loading = useAppSelector(select_user_loading);
  const [form] = Form.useForm();
  const [isModal, setIsModal] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const user_list_data = useMemo(() => {
    return user_list.list.map(({ id, name, sex, age, birth, address }) => ({
      key: id,
      name,
      sex: sex === "0" ? "男" : "女",
      age,
      birth,
      address,
    }));
  }, [user_list]);

  const [data, setData] = useState(user_list_data);

  useEffect(() => {
    setData(user_list_data);
  }, [user_list_data]);

  useEffect(() => {
    if (!user_list.list || user_list.list.length === 0) {
      dispatch(get_user_list({}));
    }
  }, [dispatch, user_list.list]);

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleAdd = () => {
    setIsModal(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newUser = {
          id: Random.guid,
          name: values.name,
          sex: values.sex,
          age: values.age,
          birth: moment(values.birth).format("YYYY-MM-DD"),
          address: values.address,
        };
        setData((prev) => [...prev, newUser]);
        form.resetFields();
        setIsModal(false);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const onCancel = () => {
    setIsModal(false);
    form.resetFields();
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      sex: "",
      age: "",
      birth: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancels = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const page_change = (count) => {
    console.log(count);
    // 假设每页显示10条数据
    // const PAGE_COUNT = 10;
    // // 计算需要跳过的数据条目数
    // const skip = PAGE_COUNT * (count - 1);
    // // 调用action来获取对应页数的用户列表数据
    // dispatch(get_user_list({ skip }));
  };

  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "sex",
      dataIndex: "sex",
      width: "10%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: "10%",
      editable: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "birth",
      dataIndex: "birth",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "30%",
      editable: true,
    },
    {
      title: "operate",
      dataIndex: "operate",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="确定删除吗?"
            style={{ textAlign: "center" }}
            onConfirm={() => handleDelete(record.key)}
          >
            <a href="##">删除</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "operate2",
      dataIndex: "operate2",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              修改
            </Typography.Link>
            <Popconfirm title="确定要取消吗?" onConfirm={cancels}>
              <a href="##">取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSearchResults = (results) => {
    const resultsList = results.map(
      ({ id, name, sex, age, birth, address }) => ({
        key: id,
        name,
        sex: sex === "0" ? "男" : "女",
        age,
        birth,
        address,
      })
    );

    setData(resultsList);
    console.log(results);
  };

  return (
    <Form form={form} component={false}>
      <div className={styles.user_middle}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          + 新增用户
        </Button>
        <Search onSearchResults={handleSearchResults} />
      </div>

      <Modal
        title="用户信息"
        open={isModal}
        onOk={handleOk}
        onCancel={onCancel}
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
            name="sex"
            label="性别"
            rules={[{ required: true, message: "请输入性别" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birth"
            label="出生日期"
            rules={[{ required: true, message: "请输入出生日期" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        style={{ marginTop: 10 }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        loading={loading}
        dataSource={data}
        columns={columns}
        onChange={page_change}
        key={data.id}
      />
    </Form>
  );
}
export default User;
