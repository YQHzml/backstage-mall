import { Button } from "antd";
import React, { forwardRef, useState } from "react";

const child = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const { handleClickParent } = props;

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  React.useImperativeHandle(ref, () => ({
    handleClick,
  }));
  return <Button onClick={handleClickParent}>子组件:{count}</Button>;
});

export default child;
