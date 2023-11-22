import React, { useState } from "react";
import Draggable from "./draggable";
import Droppable from "./droppable";
import styles from "../index.module.scss";
import { dataArray } from "./data";
function Anime() {
  const [box1, setBox1] = useState(dataArray.first);
  const [box2, setBox2] = useState(dataArray.second);
  const [box3, setBox3] = useState(dataArray.three);
  const [box4, setBox4] = useState(dataArray.four);
  const [box5, setBox5] = useState(dataArray.five);
  const [boxList, setBoxList] = useState([box1, box2, box3, box4, box5]);

  const textData = [
    { text: "日漫女主", id: 1 },
    { text: "纯爱女主", id: 2 },
    { text: "国漫列表", id: 3 },
    { text: "日漫男主", id: 4 },
    { text: "特摄剧场", id: 5 },
  ];

  function dropChange(index) {
    return function (res) {
      const valList = res.map((item) => item.value);
      const filteredBox = boxList[index].filter((item) =>
        valList.includes(item.value)
      );
      setBoxList((prevBoxList) => {
        const newBoxList = [...prevBoxList];
        newBoxList[index] = filteredBox;
        return newBoxList;
      });
    };
  }

  return (
    <div className={styles.Anime}>
      {textData.map((item, index) => (
        <Droppable key={item.id} text={item.text} onChange={dropChange(index)}>
          {boxList[index].map((items) => (
            <Draggable key={items.id} data={items} />
          ))}
        </Droppable>
      ))}
    </div>
  );
}

export default Anime;
