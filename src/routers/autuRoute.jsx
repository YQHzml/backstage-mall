import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const allowList = ["/login", "/register"];
const loginRoute = "/login";
const indexRoute = "/home";

export default function AuthRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { children } = props;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(loginRoute);
    } else if (location.pathname === loginRoute) {
      navigate(indexRoute);
    }
  }, [location.pathname, navigate]);

  if (!localStorage.getItem("token")) {
    if (allowList.includes(location.pathname)) {
      return <>{children}</>;
    } else {
      navigate(loginRoute);
    }
  }

  return <>{children}</>;
}
