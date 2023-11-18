import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

function Mall() {
  useEffect(() => {
    setTimeout(() => {
      console.log("111");
    }, 2000);
  }, []);
  return <div>mall</div>;
}

export default Mall;
