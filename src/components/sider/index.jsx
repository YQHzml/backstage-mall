import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import usePathKey from "../../hooks/usePathKey";
import { useNavigate } from "react-router-dom";
import { select_menu } from "../../store/slice/user";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { set_tab_list } from "../../store/slice/subject";
const { Sider } = Layout;

function SiderCp() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const path_key = usePathKey();
  const menu = useAppSelector(select_menu);
  const menus = menu.map((item) => {
    return {
      label: item.label,
      key: item.key,
      path: item.path,
    };
  });

  useEffect(() => {
    if (path_key) {
      setCurrent(path_key);
    }
  }, [path_key]);

  function onClick(e) {
    setCurrent(e.key);
    const page = menus.find((item) => {
      return item.key === e.key;
    });

    navigate(page.path);

    const newTabList = {
      key: page.key,
      path: page.path,
    };
    dispatch(set_tab_list(newTabList));
  }
  return (
    <div>
      <Sider width={180}>
        <Menu
          mode="inline"
          onClick={onClick}
          selectedKeys={current}
          style={{ height: "100%", textAlign: "center" }}
          items={menus}
        />
      </Sider>
    </div>
  );
}

export default SiderCp;
