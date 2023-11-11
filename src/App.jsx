import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { routerData } from "./config";

// 组件
import Login from "./pages/login";
import Home from "./pages/home";
import User from "./pages/user";
import Mall from "./pages/mall";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";

import LayOut from "./components/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"}></Navigate>}></Route>

      {/* 登录 */}
      <Route path={routerData.login.path} element={<Login />} />

      {/* layout布局 */}
      <Route element={<LayOut />}>
        {/* 主页 */}
        <Route path={routerData.home.path} element={<Home />} />
        {/* 商品 */}
        <Route path={routerData.mall.path} element={<Mall />} />
        {/* 用户 */}
        <Route path={routerData.user.path} element={<User />}>
          {" "}
        </Route>
        {/* 页面一 */}
        <Route path={routerData.pageOne.path} element={<PageOne />} />
        {/* 页面二 */}
        <Route path={routerData.pageTwo.path} element={<PageTwo />} />
      </Route>
    </Routes>
  );
}

export default App;
