import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  return (
    <div className="flex justify-center items-center h-60">
    <Pie
      data={{
        labels: ["Electronics", "Fashion"],
        datasets: [
          {
            label: "Sales",
            data: [10, 20],
            backgroundColor: ["#01A89E", "#FDEE21"],
            borderColor: ["#01A89E", "#FDEE21"],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
    />
    </div>
  );
};

export default PieChart;
