import React, { useState } from "react";
import { useDrag } from "react-dnd";
import styles from "../index.module.scss";
function Draggable({ data }) {
  const [value, setValue] = useState([data]);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  if (isDragging) {
    return <div ref={drag}></div>;
  }

  return (
    <div ref={drag} className={styles.drag_container}>
      {value.map((item) => (
        <div key={item.id} className={styles.drag_name}>
          <img src={item.img} alt="图片" />
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Draggable;
