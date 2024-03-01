import { Button } from "antd";
import React, { forwardRef, useState } from "react";

const child = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  React.useImperativeHandle(ref, () => ({
    handleClick,
  }));
  return <Button>子组件:{count}</Button>;
});

export default child;
