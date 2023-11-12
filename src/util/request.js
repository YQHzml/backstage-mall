import axios from "./http";

// 登录
export function LoginPost(data) {
  //返回一个 promise 对象
  return new Promise(async (resolve, reject) => {
    const res = await axios.post("/login", data);
    resolve(res.data.data);
  });
}

// 登出
export function LogoutRequest() {
  //返回一个 promise 对象
  return new Promise(async (resolve, reject) => {
    const res = await axios.post("/logout");
    resolve(res.data.data);
  });
}

// 获取菜单
export function getMenuRequest() {
  //返回一个 promise 对象
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/menu");
    resolve(res.data.data);
  });
}

// 获取用户信息
export function getUserInfo() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/userinfo");
    resolve(res.data.data);
  });
}

// 获取面包屑数据
export function getTabList() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/tabList");
    resolve(res.data.data);
  });
}

// 获取商品数据
export function getGoods() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/goodsList");
    resolve(res.data.data);
  });
}

// 获取订单数据
export function getOrderData() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/orderData");
    resolve(res.data.data);
  });
}

// 获取折线图数据
export function getLineCharts() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/lineCharts");
    resolve(res.data);
  });
}

// 获取树状图数据
export function getTreeCharts() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/treeCharts");
    resolve(res.data);
  });
}

// 获取饼图数据
export function getPieCharts() {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get("/pieCharts");
    resolve(res.data);
  });
}
