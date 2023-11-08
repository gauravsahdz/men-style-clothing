import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
  return (
    <div className="flex justify-center items-center h-60">
      <Line
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              data: [10, 20, 30, 25, 15, 60],
              backgroundColor: "#E3F0B3",
              borderColor: "#49BEB4",
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
