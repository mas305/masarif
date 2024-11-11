// BasicsChartPage.js
import { useContext, useEffect } from "react";
import { RecordContext } from "../context/RecordContext";
import { useLocation, useNavigate } from "react-router-dom";
import { TotalMoney } from "../components/common/TotalMoney";
import BasicsChart from "../components/charts/PieChart";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { SecondaryBtn } from "../components/common/SecondaryBtn";
import PieChart from "../components/charts/PieChart";
import { handleNavigate } from "../utils";

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

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Basics Category Chart</h2>

      {/* Pie Chart (Basics Item Distribution) */}
      <PieChart chartItems={basicsItems} title="Basics Items Distribution" />

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Basics Items Overview</h3>
        <p>Total Basics Price:</p>
        <TotalMoney items={items} type="basics" />
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
            handleNavigate(navigate, "/OthersChart", id);
          }}
          text="المصروفات الأخرى"
        />
      </div>

      <div className="text-white p-3 font-bold flex flex-col mt-11 gap-y-12"></div>
    </div>
  );
}
