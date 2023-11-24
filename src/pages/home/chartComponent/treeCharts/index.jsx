import { Card } from "antd";
import * as echarts from "echarts";
import { useAppDispatch, useAppSelector } from "@/store";
import { get_tree_charts, select_tree_charts } from "@/store/slice/subject";
import { useEffect, useMemo, useRef } from "react";

function TreeCharts() {
  const dispatch = useAppDispatch();
  const chartContainerRef = useRef();
  const treeChartData = useAppSelector(select_tree_charts);

  const chartOptions = useMemo(() => {
    if (
      !treeChartData ||
      !treeChartData.data ||
      treeChartData.data.length === 0
    ) {
      return null;
    }

    return {
      legend: {
        textStyle: {
          color: "#333",
        },
      },
      grid: {
        left: "20%",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: treeChartData.data.map((item) => item.date),
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de"],
      series: [
        {
          name: "新增用户",
          data: treeChartData.data.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: treeChartData.data.map((item) => item.active),
          type: "bar",
        },
      ],
    };
  }, [treeChartData]);

  useEffect(() => {
    if (!chartOptions) {
      return;
    }
    const myChart = echarts.init(chartContainerRef.current);
    myChart.setOption(chartOptions);

    return () => {
      myChart.dispose();
    };
  }, [chartOptions]);

  useEffect(() => {
    if (!treeChartData?.data?.length) {
      dispatch(get_tree_charts());
    }
  }, [dispatch, treeChartData]);

  return (
    <Card hoverable style={{ height: 335, marginTop: 15, marginRight: 20 }}>
      <div ref={chartContainerRef} style={{ height: 300, width: 580 }}></div>
    </Card>
  );
}

export default TreeCharts;
