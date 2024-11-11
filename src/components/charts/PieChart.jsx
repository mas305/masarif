// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartItems, title }) {
  // Function to generate random colors for the pie chart segments
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Data for the pie chart (showing only basics items) with unique colors for each item
  const pieData = {
    labels: chartItems.map((item) => item.itemName), // Each item name as a label
    datasets: [
      {
        label: "Basics Items Price Distribution",
        data: chartItems.map((item) => parseFloat(item.price)), // Prices of each basics item
        backgroundColor: chartItems.map(() => generateRandomColor()), // Generate a unique color for each item
        borderColor: ["#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Pie data={pieData} />
    </div>
  );
}

export default PieChart;
