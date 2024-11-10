import { useContext, useEffect } from "react";
import { RecordContext } from "../context/RecordContext";
import { Pie, Bar } from "react-chartjs-2";
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

export function MonthChartPage() {
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

  // Get items and budget from the record
  const items = record?.items || [];
  const totalBudget = parseFloat(record?.budget) || 0; // Ensure the budget is treated as a number

  // Calculate the total price of basics and others
  const totalBasicsPrice = items
    .filter((item) => item.category === "basics")
    .reduce((total, item) => total + parseFloat(item.price), 0);

  const totalOthersPrice = items
    .filter((item) => item.category === "other")
    .reduce((total, item) => total + parseFloat(item.price), 0);

  // Calculate the available budget (remaining)
  const totalSpent = totalBasicsPrice + totalOthersPrice;
  const availableBudget = totalBudget - totalSpent;

  const handleNavigate = (path) => {
    navigate(path, { state: { id } });
  };

  // Data for the pie chart
  const pieData = {
    labels: ["Basics", "Others", "Available"],
    datasets: [
      {
        label: "Budget Distribution",
        data: [totalBasicsPrice, totalOthersPrice, availableBudget],
        backgroundColor: ["#36A2EB", "#FF6384", "#4CAF50"], // Colors for each section
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the bar chart
  const barData = {
    labels: ["Basics", "Others"],
    datasets: [
      {
        label: "Total Price",
        data: [totalBasicsPrice, totalOthersPrice],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Month Budget Charts</h2>

      {/* Pie Chart (Budget Distribution with Basics, Others, Available) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Budget Distribution</h3>
        <Pie data={pieData} />
      </div>

      <div className="text-white p-3 font-bold flex flex-col mt-11 gap-y-12">
        <button
          onClick={() => {
            handleNavigate("/BasicsChart");
          }}
          className="bg-slate-500 py-7"
        >
          مصروفات الأساسيات
        </button>
        <button
          onClick={() => handleNavigate("/OthersChart")}
          className="bg-slate-500 py-7"
        >
          المصروفات الاخرى
        </button>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Items Overview</h3>
        <p>Basics: {totalBasicsPrice.toFixed(2)} (Spent)</p>
        <p>Others: {totalOthersPrice.toFixed(2)} (Spent)</p>
        <p>Available Budget: {availableBudget.toFixed(2)}</p>
      </div>
    </div>
  );
}
