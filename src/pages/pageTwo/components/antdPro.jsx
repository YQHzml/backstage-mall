import React, { useState } from "react";
import { Space, Tabs, message, theme } from "antd";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
const AntdPro = () => {
  const [loginType, setLoginType] = useState("account");
  const token = theme.useToken();
  return (
    <LoginForm
      title="Login"
      subTitle="小元登录界面"
      actions={<Space>其他登陆方式</Space>}
    >
      <Tabs
        centered
        activeKey={loginType}
        items={[
          { label: "账户密码登录", key: "account" },
          { label: "手机号登录", key: "mobile" },
        ]}
        onChange={(activeKey) => setLoginType(activeKey)}
      ></Tabs>
      {loginType === "account" && (
        <>
          <ProFormText
            name="username"
            autocomplete="off"
            fieldProps={{ size: "large", prefix: <UserOutlined /> }}
            placeholder={"用户名:admin or user"}
            rules={[{ required: true, message: "请输入用户名" }]}
          />
          <ProFormText.Password
            autocomplete="off"
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
              strengthtext: "Password",
              statusRender: (value) => {
                const getStatus = () => {
                  if (value && value.length > 12) {
                    return "ok";
                  }
                  if (value && value.length > 6) {
                    return "pass";
                  }
                  return "poor";
                };
                const status = getStatus();
                if (status === "pass") {
                  return (
                    <div style={{ color: token.colorWarning }}>强度：中</div>
                  );
                }
                if (status === "ok") {
                  return (
                    <div style={{ color: token.colorSuccess }}>强度：强</div>
                  );
                }
                return <div style={{ color: token.colorError }}>强度：弱</div>;
              },
            }}
            placeholder={"密码:antdPro"}
            rules={[{ required: true, message: "请输入密码" }]}
          />
        </>
      )}
      {loginType === "mobile" && (
        <>
          <ProFormText
            fieldProps={{
              size: "large",
              prefix: <MobileOutlined />,
            }}
            name="mobile"
            placeholder={"手机号"}
            rules={[
              { required: true, message: "请输入手机号！" },
              { pattern: /^1\d{10}$]/, message: "手机格式错误" },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{ size: "large", prefix: <LockOutlined /> }}
            captchaProps={{ size: "large" }}
            placeholder={"请输入验证码"}
            onGetCaptcha={async () => {
              message.success("验证码获取成功");
            }}
          />
        </>
      )}
      <div style={{ marginBlockEnd: 20 }}>
        <ProFormCheckbox noStyle name={"autoLogin"}>
          自动登录
        </ProFormCheckbox>
        <a style={{ float: "right" }} href="/#">
          忘记密码
        </a>
      </div>
    </LoginForm>
  );
};

export default AntdPro;
