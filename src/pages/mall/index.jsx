import { Card } from "antd";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import "./index.module.scss";
function Mall() {
  const domRef = useRef();

  useEffect(() => {
    chartTint();
  }, []);

  const chartTint = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current);

    // 绘制图表
    myChart.setOption({
      title: {
        text: "标题1",
        text2: "标题2",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量2",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  };

  return (
    <Card style={{ width: 480 }}>
      {/* 挂载节点 */}
      <div ref={domRef} style={{ height: "400px" }}></div>
    </Card>
  );
}
export default Mall;
