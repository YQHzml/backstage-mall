import React, { useState } from "react";
import styles from "../index.module.scss";
import { dataArray } from "./data";
import DraggableItem from "./DraggableItem";

function Anime() {
  const [data, setData] = useState(dataArray);

  const moveItem = (
    sourceCategory,
    destCategory,
    sourceIndex,
    destIndex,
    data,
    setData
  ) => {
    const itemToMove = data[sourceCategory][sourceIndex];
    const newData = { ...data };
    newData[sourceCategory].splice(sourceIndex, 1);
    newData[destCategory].splice(destIndex, 0, itemToMove);
    setData(newData);
  };

  return (
    <div className={styles.Anime}>
      {Object.keys(data).map((category) => (
        <div key={category}>
          <div className={styles.drop_container}>
            <div className={styles.drop_title}>{category}</div>
            {data[category].map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                category={category}
                moveItem={moveItem}
                data={data}
                setData={setData}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Anime;
