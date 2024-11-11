import { useContext, useEffect } from "react";
import { RecordContext } from "../context/RecordContext";
import { handleNavigate } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { TotalMoney } from "../components/common/TotalMoney";
import { SecondaryBtn } from "../components/common/SecondaryBtn";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import PieChart from "../components/charts/PieChart";

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
  const totalBudget = parseFloat(record?.budget) || 0;

  // Calculate total prices for basics and others
  const basicsItems = items.filter((item) => item.category === "basics");
  const totalBasicsPrice = basicsItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );
  const totalOthersPrice = items
    .filter((item) => item.category === "other")
    .reduce((total, item) => total + parseFloat(item.price), 0);

  // Calculate available budget
  const totalSpent = totalBasicsPrice + totalOthersPrice;
  const availableBudget = totalBudget - totalSpent;

  // Data for budget distribution
  const budgetDistributionData = [
    { itemName: "Basics", price: totalBasicsPrice },
    { itemName: "Others", price: totalOthersPrice },
    { itemName: "Available", price: availableBudget },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Month Budget Charts</h2>

      {/* PieChart Component for Budget Distribution */}
      <PieChart
        chartItems={budgetDistributionData}
        title="Budget Distribution"
      />

      {/* Buttons to navigate */}
      <div className="text-white p-3 font-bold flex flex-col mt-11 gap-y-12">
        <PrimaryBtn
          handleNavigate={() => {
            handleNavigate(navigate, "/basicsChart", id);
          }}
          text="المصروفات الأساسية"
        />

        <SecondaryBtn
          handleNavigate={() => {
            handleNavigate(navigate, "/OthersChart", id);
          }}
          text="المصروفات الأخرى"
        />
      </div>

      {/* Items Overview */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Items Overview</h3>
        <p>Total Basics Price:</p>
        <TotalMoney items={items} type="basics" />
        <p>Total Others Price:</p>
        <TotalMoney items={items} type="other" />
        <p>Available Budget: {availableBudget.toFixed(2)}</p>
      </div>
    </div>
  );
}
