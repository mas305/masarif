import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { RecordContext } from "../context/RecordContext";
import { PrimaryBtn } from "../components/common/PrimaryBtn";

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
              <strong>Month:</strong> {record.month}
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
    </div>
  );
}
