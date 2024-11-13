import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { RecordContext } from "../context/RecordContext";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import PieChart from "../components/charts/PieChart";
import MasrofForm from "../components/common/MasrofFrom";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const { record, setRecord } = useContext(RecordContext);

  useEffect(() => {
    if (id) {
      const storedRecord = localStorage.getItem(id);
      if (storedRecord) {
        setRecord(JSON.parse(storedRecord));
      }
    }
  }, [id, setRecord]);

  // Function to handle navigation with the ID in state
  const handleNavigate = (path) => {
    navigate(path, { state: { id } });
  };

  // Get items and budget from the record
  const items = record?.items || [];
  const totalBudget = parseFloat(record?.budget) || 0;

  const otherItems = items.filter((item) => item.category === "other");

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
    <div className="App">
      <header className="App-header">
        <h1 className="text-gray-500 p-3 font-bold">مصاريف</h1>
      </header>

      <div className="text-white p-3 font-bold flex flex-col mt-11 gap-y-12">
        {record ? (
          <div className="bg-gray-500 p-4 rounded shadow mb-4">
            <p>
              <strong>Year:</strong> {record.year}
            </p>
            <p>
              <strong>Month:</strong> {record.budgetName}
            </p>
            <p>
              <strong>Budget:</strong> ${record.budget}
            </p>
          </div>
        ) : (
          <p>No record found</p>
        )}

        <PrimaryBtn
          handleNavigate={handleNavigate}
          path="/monthChart"
          text="اظهر كل المصروفات"
        />

        <PrimaryBtn
          handleNavigate={handleNavigate}
          path="/addMasrof"
          text="اضافة مصروف جديد"
        />

        <PrimaryBtn
          handleNavigate={handleNavigate}
          path="/editMonthBudget"
          text="تعديل مصروف الشهر"
        />
      </div>

      {/* PieChart Component for Budget Distribution */}
      <PieChart
        chartItems={budgetDistributionData}
        title="Budget Distribution"
      />

      <PieChart chartItems={basicsItems} title="Budget Distribution" />

      <PieChart chartItems={otherItems} title="Budget Distribution" />

      <MasrofForm />
    </div>
  );
}
