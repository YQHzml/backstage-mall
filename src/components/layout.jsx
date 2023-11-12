import { Outlet } from "react-router-dom";
import Header from "./header";
import Sider from "./sider";
import BreadCb from "./breadcrumb";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { get_menu } from "../store/slice/user";

function LayOut() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get_menu());
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="header_wrap">
        <Header />
      </div>

      <div className="sider_outlet_container">
        <div>
          <Sider />
        </div>
        <div className="outlet_wrap">
          <BreadCb />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayOut;
