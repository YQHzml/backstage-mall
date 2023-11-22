import React, { useState } from "react";
import Draggable from "./draggable";
import Droppable from "./droppable";
import styles from "../index.module.scss";
import { dataArray } from "./data";
function Anime() {
  const first = dataArray.first;
  const second = dataArray.second;
  const three = dataArray.three;
  const four = dataArray.four;
  const five = dataArray.five;

  const [box1, setBox1] = useState(first);
  const [box2, setBox2] = useState(second);
  const [box3, setBox3] = useState(three);
  const [box4, setBox4] = useState(four);
  const [box5, setBox5] = useState(five);

  const textData = [
    { text: "日漫女主", id: 1 },
    { text: "纯爱女主", id: 2 },
    { text: "国漫列表", id: 3 },
    { text: "日漫男主", id: 4 },
    { text: "特摄剧场", id: 5 },
  ];

  function dropChange(res) {
    const valList = res.map((item) => item.value);
    const filterList = box1.filter((item) => valList.includes(item.value));
    setBox1(filterList);
  }

  return (
    <div className={styles.Anime}>
      {/* {textData.map((item) => (
        <Droppable key={item.id} text={item.text} onChange={dropChange}>
          {box1.map((items) => (
            <Draggable key={items.id} data={items} />
          ))}
        </Droppable>
      ))} */}

      <Droppable
        key={textData.id}
        text={textData[0].text}
        onChange={dropChange}
      >
        {box1.map((items) => (
          <Draggable key={items.id} data={items} />
        ))}
      </Droppable>

      <Droppable
        key={textData.id}
        text={textData[1].text}
        onChange={dropChange}
      >
        {box2.map((items) => (
          <Draggable key={items.id} data={items} />
        ))}
      </Droppable>
      <Droppable
        key={textData.id}
        text={textData[2].text}
        onChange={dropChange}
      >
        {box3.map((items) => (
          <Draggable key={items.id} data={items} />
        ))}
      </Droppable>
      <Droppable
        key={textData.id}
        text={textData[3].text}
        onChange={dropChange}
      >
        {box4.map((items) => (
          <Draggable key={items.id} data={items} />
        ))}
      </Droppable>
      <Droppable
        key={textData.id}
        text={textData[4].text}
        onChange={dropChange}
      >
        {box5.map((items) => (
          <Draggable key={items.id} data={items} />
        ))}
      </Droppable>
    </div>
  );
}

export default Anime;
