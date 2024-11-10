import { useContext, useEffect } from "react";
import { RecordContext } from "../context/RecordContext";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useLocation, useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export function BasicsChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const { record, setRecord } = useContext(RecordContext);

  useEffect(() => {
    if (id) {
      const storedRecord = localStorage.getItem(id);
      if (storedRecord) {
        setRecord(JSON.parse(storedRecord)); // Load the record from localStorage
      }
    }
  }, [id, setRecord]);

  // Get items from the record
  const items = record?.items || [];

  // Filter items based on the "basics" category
  const basicsItems = items.filter((item) => item.category === "basics");

  // Calculate the total price for basics items
  const totalBasicsPrice = basicsItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

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
    labels: basicsItems.map((item) => item.itemName), // Each item name as a label
    datasets: [
      {
        label: "Basics Items Price Distribution",
        data: basicsItems.map((item) => parseFloat(item.price)), // Prices of each basics item
        backgroundColor: basicsItems.map(() => generateRandomColor()), // Generate a unique color for each item
        borderColor: ["#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Basics Category Chart</h2>

      {/* Pie Chart (Basics Item Distribution) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Basics Items Distribution
        </h3>
        <Pie data={pieData} />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Basics Items Overview</h3>
        <p>Total Basics Price: ${totalBasicsPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
