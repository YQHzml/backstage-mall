import styles from "./index.module.scss";
import HeaderTitle from "./assets/header-title.jpg";
import HeaderUserinfo from "./assets/header-userinfo.jpg";
import { List, Popover, Dropdown, Button, Avatar, Typography } from "antd";
import { useEffect, useState } from "react";
import { LogoutRequest } from "../../util/request";
import { useNavigate } from "react-router-dom";
import { select_user_info } from "../../store/slice/user";
import { useSelector } from "react-redux";

const { Text } = Typography;
function Header() {
  const navigate = useNavigate();
  const userInfo = useSelector(select_user_info);
  // 当前时间
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleDateString()
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function logout() {
    await LogoutRequest();
    navigate("/login");
  }

  return (
    <div className={styles.header_container}>
      <div className={styles.logo_container}>
        <img src={HeaderTitle} alt="HeaderTitle" />
        <h1 className={styles.logo_item}>小元闲着没事搭建的后台</h1>
      </div>

      <div className={styles.info_container}>
        <Popover
          style={{ width: "240px", userSelect: "none" }}
          placement="bottomRight"
          content={<List> 您于{currentTime}登陆过小元后台系统!</List>}
          trigger="hover"
        >
          <div className={styles.message} />
        </Popover>
        <div className={styles.profile}>
          <Dropdown
            placement="bottom"
            arrow
            menu={{
              items: [
                {
                  key: "user",
                  label: (
                    <Button
                      style={{ color: "unset" }}
                      type="link"
                      onClick={() => console.log("个人中心")}
                    >
                      个人中心
                    </Button>
                  ),
                },
                {
                  key: "logout",
                  label: (
                    <Button
                      style={{ color: "unset" }}
                      type="link"
                      onClick={logout}
                    >
                      退出登录
                    </Button>
                  ),
                },
              ],
            }}
          >
            <Avatar
              className={styles.avatar}
              size={44}
              src={HeaderUserinfo}
              draggable={false}
            />
          </Dropdown>
          <div className={styles.name}>
            <Text style={{ width: "100px" }} ellipsis={{ tooltip: "hh" }}>
              {userInfo.name ? userInfo.name : "草莓弟"}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
