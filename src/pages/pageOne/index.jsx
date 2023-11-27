import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
function FlipCard() {
  const [isFur, setIsFur] = useState(false);
  const [count, setCount] = useState(0);
  const prev = useRef();
  console.log(prev);

  const handleClick = () => {
    setIsFur(!isFur);
  };

  const addCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    prev.current = count;
  }, [count]);

  const prevCount = prev.current;

  return (
    <div
      className={classnames(styles.bubble, { [styles.background1]: isFur })}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      hhh
      <br />
      {count}
      <br />
      {prevCount}
      <button onClick={addCount}>+1</button>
    </div>
  );
}

export default FlipCard;
