import React, { useState } from "react";
import Draggable from "./draggable";
import Droppable from "./droppable";
import styles from "../index.module.scss";
import { dataArray } from "./data";
function Anime() {
  const [boxList, setBoxList] = useState(() => {
    const { first, second, three, four, five } = dataArray;
    return [first, second, three, four, five];
  });

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
