import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "../index.module.scss";

const DraggableItem = ({ item, index, category, moveItem, data, setData }) => {
  const ref = useRef();

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { id: item.id, index, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "item",
    canDrop: () => category !== "new",
    drop: (itemProps, monitor) => {
      const dragIndex = itemProps.index;
      const hoverIndex = index;
      const sourceCategory = itemProps.category;
      const destCategory = category;

      if (
        dragIndex === hoverIndex &&
        sourceCategory === destCategory &&
        monitor.isOver({ shallow: true })
      ) {
        return;
      }

      moveItem(
        sourceCategory,
        destCategory,
        dragIndex,
        hoverIndex,
        data,
        setData
      );
      itemProps.index = hoverIndex;
      itemProps.category = destCategory;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.drag_container}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <div className={styles.drag_name}>
        <img src={item.img} alt={item.name} />
        {item.name}
      </div>
    </div>
  );
};

export default DraggableItem;
