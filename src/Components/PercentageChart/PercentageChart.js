import React from "react";
import { Doughnut } from "react-chartjs-2";

const PercentageChart = ({ chartData }) => {
  return <Doughnut data={chartData} />;
};

export default PercentageChart;
