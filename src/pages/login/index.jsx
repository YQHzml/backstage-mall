import styles from "./index.module.scss";
import login_left from "./assets/login-left.png";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginPost } from "@/util/request";
import { set_user_info } from "@/store/slice/user";

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  async function onLogin(value) {
    const user_info = await LoginPost(value);
    dispatch(set_user_info(user_info));

    if (
      user_info.data.phone === value.phone &&
      user_info.data.password === value.password
    ) {
      localStorage.setItem("name", user_info.data.name);
      localStorage.setItem("token", user_info.token);
      navigate("/home");
      message.success("登陆成功");
    } else {
      message.error("密码错误");
    }
  }

  return (
    <div className={styles.pages_container}>
      <div className={styles.login_container}>
        {/* 左侧 */}
        <div className={styles.login_left}>
          <div className={styles.left_title}>
            <img
              src={login_left}
              alt="login_left"
              className={styles.login_img}
            />
          </div>
        </div>
        {/* 右侧 */}
        <div className={styles.login_right}>
          <div className={styles.right_title}>小元后台管理</div>
          <div className={styles.right_form}>
            <Form
              onFinish={onLogin}
              size="large"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 20 }}
              labelAlign="left"
              onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="账号"
                name="phone"
                rules={[
                  { required: true, message: "请填写手机号" },
                  {
                    pattern: new RegExp(/^1[3-9]\d{9}$/, "g"),
                    message: "请输入正确的手机号",
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
              <div style={{ position: "relative" }}>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: "请输入密码" }]}
                >
                  <Input
                    placeholder="请输入密码"
                    style={{ padding: "7px 100px 7px 11px" }}
                  />
                </Form.Item>
              </div>
              <div className={styles.form_btn}>
                <Button
                  className={styles.form_btn2}
                  type="primary"
                  htmlType="submit"
                >
                  登录
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
