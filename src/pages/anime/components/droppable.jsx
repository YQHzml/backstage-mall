import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styles from "../index.module.scss";
function Droppable({ onChange, text, children }) {
  const [value, setValue] = useState([]);
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "card",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item) => {
        const targetValue = [...value];
        targetValue.push(item);
        setValue(targetValue);
        onChange(targetValue);
      },
    }),
    []
  );

  function showCanDrop() {
    if (!canDrop && !isOver && !value.length) return <div></div>;
  }

  function showValue() {
    return value.map((item) => {
      return <div key={item.id}>{item.name}</div>;
    });
  }

  return (
    <div ref={drop} className={styles.drop_container}>
      {showCanDrop()}
      {showValue()}
      <div className={styles.drop_text}>{text}</div>
      {children}
    </div>
  );
}

export default Droppable;
