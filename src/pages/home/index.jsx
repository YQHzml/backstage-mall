import { Card, Table } from "antd";
import styles from "./index.module.scss";
import UserInfo from "./assets/userinfo.jpg";
import { useState, useEffect } from "react";
import { ShoppingOutlined } from "@ant-design/icons";

import LineCharts from "./chartComponent/lineCharts";
import TreeCharts from "./chartComponent/treeCharts";
import PieCharts from "./chartComponent/pieCharts";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  get_goods_list,
  get_order_data,
  select_goods_list,
  select_loading,
  select_order_data,
} from "../../store/slice/subject";
const { Meta } = Card;
function Home() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(select_loading);
  const order_data = useAppSelector(select_order_data);
  const goods_list = useAppSelector(select_goods_list);
  const goods_list_data = goods_list[0];
  // 当前时间
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleDateString()
  );

  const columns = [
    { title: "品牌", dataIndex: "title" },
    { title: "今日购买", dataIndex: "todayBuy" },
    { title: "本月购买", dataIndex: "monthBuy" },
    { title: "总购买", dataIndex: "totalBuy" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(get_goods_list());
    dispatch(get_order_data());
  }, [dispatch]);

  return (
    <div className={styles.home_container}>
      {/* 左侧 */}
      <div className={styles.left_container}>
        <Card
          hoverable
          style={{
            width: 330,
            marginTop: 10,
          }}
          cover={<img alt="example" src={UserInfo} />}
        >
          <Meta
            title="超级管理员:草莓弟"
            description={`登陆日期:${currentTime}`}
          />
        </Card>

        {/* 商品数量 */}
        <Table
          style={{
            width: 330,
            marginTop: 10,
          }}
          pagination={false}
          loading={loading}
          columns={columns}
          dataSource={goods_list_data}
        />
      </div>
      {/* 右侧 */}
      <div className={styles.right_container}>
        {/* 顶部 */}
        <div className={styles.right_top}>
          {order_data.map((item, index) => (
            <Card
              hoverable
              title={item.name}
              key={item.name}
              className={styles.card}
              cover={[
                <ShoppingOutlined
                  key="shopping"
                  className={styles.card_icon}
                />,
              ]}
            >
              <p>￥:{item.value}</p>
            </Card>
          ))}
        </div>
        {/* 中间 */}
        <div className={styles.right_middle}>
          <LineCharts />
        </div>

        {/* 底部 */}
        <div className={styles.right_footer}>
          <div className={styles.footer_left}>
            <TreeCharts />
          </div>
          <div className={styles.footer_right}>
            <PieCharts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
