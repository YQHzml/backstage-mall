import React, { useState } from "react";
import styles from "../index.module.scss";
import { dataArray } from "./data";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ITEM: "item",
};

function Anime() {
  const [data, setData] = useState(dataArray);

  const moveItem = (
    sourceIndex,
    targetIndex,
    sourceCategory,
    targetCategory
  ) => {
    const sourceList = [...data[sourceCategory]];
    const targetList = [...data[targetCategory]];
    const draggedItem = sourceList[sourceIndex];

    sourceList.splice(sourceIndex, 1);
    targetList.splice(targetIndex, 0, draggedItem);

    setData((prevData) => ({
      ...prevData,
      [sourceCategory]: sourceList,
      [targetCategory]: targetList,
    }));
  };

  const DraggableItem = ({ item, index, category }) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: ItemTypes.ITEM,
        item: { id: item.id, index, category },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          opacity: monitor.isDragging() ? 0.5 : 1,
        }),
      }),
      []
    );

    const [, drop] = useDrop(
      () => ({
        accept: ItemTypes.ITEM,
        drop: (droppedItem) => {
          if (droppedItem.category !== category) {
            if (data[category].length === 0) {
              // 如果列表为空，创建一个新的数组并添加拖拽的项
              const newList = [droppedItem.item];
              setData({
                ...data,
                [category]: newList,
              });
            } else {
              moveItem(
                droppedItem.index,
                index,
                droppedItem.category,
                category
              );
            }
          }
        },
      }),
      []
    );

    if (isDragging) return null;

    return (
      <div ref={(node) => drag(drop(node))} className={styles.drag_container}>
        <div className={styles.drag_name}>
          <img src={item.img} alt={item.name} />
          {item.name}
        </div>
      </div>
    );
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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Anime;
