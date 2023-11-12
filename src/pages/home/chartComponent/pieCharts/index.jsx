import { Card } from "antd";
import * as echarts from "echarts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  get_pie_charts,
  select_pie_charts,
} from "../../../../store/slice/subject";
import { useEffect, useMemo, useRef } from "react";

function PieCharts() {
  const chartContainerRef = useRef();
  const dispatch = useAppDispatch();
  const pieChartData = useAppSelector(select_pie_charts);

  const chartOptions = useMemo(() => {
    if (
      !pieChartData ||
      !pieChartData?.data ||
      pieChartData.data.length === 0
    ) {
      return null;
    }

    return {
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [
        {
          data: pieChartData.data,
          type: "pie",
        },
      ],
    };
  }, [pieChartData]);

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
    if (!pieChartData?.data?.length) {
      dispatch(get_pie_charts());
    }
  }, [dispatch, pieChartData]);
  return (
    <Card hoverable style={{ height: 330, marginTop: 15 }}>
      <div ref={chartContainerRef} style={{ height: 300, width: 580 }}></div>
    </Card>
  );
}

export default PieCharts;
