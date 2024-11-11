import { useContext, useEffect } from "react";
import { RecordContext } from "../context/RecordContext";
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
import BasicsChart from "../components/charts/PieChart";
import { TotalMoney } from "../components/common/TotalMoney";
import PieChart from "../components/charts/PieChart";
import { handleNavigate } from "../utils";
import { SecondaryBtn } from "../components/common/SecondaryBtn";
import { PrimaryBtn } from "../components/common/PrimaryBtn";

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

export function OthersChartPage() {
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

  // Filter items based on the "other" category
  const otherItems = items.filter((item) => item.category === "other");

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Other Category Chart</h2>

      {/* Pie Chart (Other Item Distribution) */}
      <PieChart chartItems={otherItems} title="Basics Items Distribution" />

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Other Items Overview</h3>
        <TotalMoney items={items} type="other" />
      </div>

      {/* Buttons to navigate */}
      <div className="text-white p-3 font-bold flex flex-col mt-11 gap-y-12">
        <PrimaryBtn
          handleNavigate={() => {
            handleNavigate(navigate, "/monthChart", id);
          }}
          text="المصروفات الشهر"
        />

        <SecondaryBtn
          handleNavigate={() => {
            handleNavigate(navigate, "/basicsChart", id);
          }}
          text="المصروفات الأساسية"
        />
      </div>
    </div>
  );
}
