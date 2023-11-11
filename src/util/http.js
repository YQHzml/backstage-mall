import axios from "axios";
import EventBus from "./event";

const instance = axios.create({
  validateStatus(status) {
    return status < 500;
  },
  // 通用请求地址前缀
  baseURL: "https://mock.apifox.com/m1/3537392-0-default/api/user/",
  //超时时间
  timeout: 10000,
  header: {
    "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.code === 401) {
        EventBus.emit("global_not_login", response.data.msg);
      }
      if (response.data.code === -1) {
        EventBus.emit("global_error_tips", response.data.msg);
      }
    } else if (response.status === 403) {
      EventBus.emit("global_error_auth", "没有权限，别瞎访问");
    }
    return response;
  },

  function (err) {
    EventBus.emit("global_error_tips", err.response.data.message);
  }
);

export default instance;
