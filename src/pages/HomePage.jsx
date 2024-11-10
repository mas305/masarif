import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { RecordContext } from "../context/RecordContext";

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

        <button
          onClick={() => handleNavigate("/monthChart")}
          className="bg-slate-500 py-7"
        >
          اظهر كل المصروفات
        </button>

        <button
          onClick={() => handleNavigate("/addMasrof")}
          className="bg-slate-500 py-7"
        >
          اضافة مصروف جديد
        </button>

        <button
          onClick={() => handleNavigate("/editMonthBudget")}
          className="bg-slate-500 py-7"
        >
          تعديل مصروف الشهر
        </button>
      </div>
    </div>
  );
}
