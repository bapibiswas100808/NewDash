import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData1 }) => {
  return <Line data={chartData1} height={195} width={350} />;
};

export default LineChart;
