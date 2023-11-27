import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const allowList = ["/login", "/register"];
const loginRoute = "/login";
const indexRoute = "/home";
export default function AuthRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { children } = props;

  if (localStorage.getItem("token")) {
    // 有 token 的状态下禁止用户回到登录页，重定向到首页
    if (location.pathname === loginRoute) {
      return navigate(indexRoute);
    } else {
      // 其他路由均可正常跳转
      return <>{children}</>;
    }
  } else {
    // 无 token 的状态下，如果要跳转的路由是白名单中的路由，正常跳转
    if (allowList.includes(location.pathname || "")) {
      return <>{children}</>;
    } else {
      // 无 token 且非白名单路由，重定向至登录页
      return navigate(loginRoute);
    }
  }
}
