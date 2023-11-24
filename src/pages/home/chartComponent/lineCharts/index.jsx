import { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";
import { useAppDispatch, useAppSelector } from "@/store";
import { get_line_charts, select_line_charts } from "@/store/slice/subject";
import { Card } from "antd";

function LineCharts() {
  const chartContainerRef = useRef();
  const lineChartData = useAppSelector(select_line_charts);
  const dispatch = useAppDispatch();

  // 生成图表配置选项
  const chartOptions = useMemo(() => {
    if (
      !lineChartData ||
      !lineChartData.data ||
      lineChartData.data.length === 0
    ) {
      return null;
    }

    const xAxis = Object.keys(lineChartData.data[0]);
    const xAxisData = { data: xAxis };

    const series = xAxis.map((key) => ({
      name: key,
      data: lineChartData.data.map((item) => item[key]),
      type: "line",
    }));

    return { xAxis: xAxisData, yAxis: {}, legend: xAxisData, series: series };
  }, [lineChartData]);

  // 初始化图表
  useEffect(() => {
    if (!chartOptions) {
      return; // 如果chartOptions为空，则不进行初始化图表的操作
    }

    const myChart = echarts.init(chartContainerRef.current);
    myChart.setOption(chartOptions);

    // 清理函数
    return () => {
      myChart.dispose();
    };
  }, [chartOptions]);

  // 获取线形图数据
  useEffect(() => {
    if (!lineChartData?.data?.length) {
      dispatch(get_line_charts()); // 如果lineChartData为空或者data为空数组，则调用获取数据的方法
    }
  }, [dispatch, lineChartData]);

  return (
    <Card hoverable style={{ height: 200 }}>
      <div ref={chartContainerRef} style={{ width: 1200, height: 200 }}></div>
    </Card>
  );
}

export default LineCharts;
