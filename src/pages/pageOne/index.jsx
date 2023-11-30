import styles from "./index.module.scss";
import React, { useState } from "react";
import classnames from "classnames";
import { dataArray } from "./data";
import { Card } from "antd";
const { Meta } = Card;

function PageOne() {
  const [bgImg, setBgImg] = useState(0);
  const [selectedItem, setSelectedItem] = useState([dataArray[0]]);

  const handleClick = (imgIndex, item) => {
    setBgImg(imgIndex);
    setSelectedItem([item]);
  };

  const renderTitles = (data) => {
    return data.map((item, index) => (
      <div
        key={index}
        className={styles.title}
        onClick={() => handleClick(index + 1, item)}
        onKeyDown={() => handleClick(index + 1)}
      >
        {item.title}
      </div>
    ));
  };

  const renderSelectedItems = () => {
    return Array.from(selectedItem).map((item, index) => (
      <div key={index} className={styles.right_top}>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.p1}>{item.company}</p>
        <p className={styles.p2}>{item.BasicInfo}</p>
        <p className={styles.p3}>{item.synopsis}</p>

        <div className={styles.below}>
          {item.RoleIntroduction.map((item, index) => (
            <div key={index}>
              <Card
                style={{ height: 480, width: 250 }}
                hoverable
                cover={<img alt={item.img} src={item.img} />}
              >
                <Meta title={item.name} />
                <p>{item.dub}</p>
                <p>{item.introduce}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      {/* 左侧 */}
      <div className={styles.left}>
        <div className={styles.left_top}>{renderTitles(dataArray)}</div>

        <div className={classnames(styles.bg, styles[`bg_${bgImg}`])}></div>
      </div>

      {/* 右侧 */}
      <div className={styles.right}>{renderSelectedItems()}</div>
    </div>
  );
}

export default PageOne;
