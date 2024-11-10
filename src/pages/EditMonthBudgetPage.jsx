import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RecordContext } from "../context/RecordContext";

export function EditMonthBudgetPage() {
  const location = useLocation();
  const { id } = location.state || {};
  const { record, setRecord } = useContext(RecordContext);
  const [newBudget, setNewBudget] = useState(record?.budget || ""); // Initialize with current budget

  useEffect(() => {
    if (id) {
      //   console.log("Record ID:", id);
      const storedRecord = localStorage.getItem(id);
      if (storedRecord) {
        setRecord(JSON.parse(storedRecord));
      }
    }
  }, [id, setRecord]);

  useEffect(() => {
    if (record) {
      setNewBudget(record.budget); // Update input when record is set
    }
  }, [record]);

  const handleBudgetChange = (e) => {
    setNewBudget(e.target.value);
  };

  const handleSaveBudget = () => {
    if (record) {
      const updatedRecord = { ...record, budget: newBudget };
      setRecord(updatedRecord); // Update context state
      localStorage.setItem(id, JSON.stringify(updatedRecord)); // Save to localStorage
      alert("Budget updated successfully!");
    }
  };

  return (
    <div>
      <h1>Edit Month Budget</h1>
      {record ? (
        <div>
          <p>Year: {record.year}</p>
          <p>Month: {record.month}</p>
          <label>
            Budget:
            <input
              type="number"
              value={newBudget}
              onChange={handleBudgetChange}
              className="border rounded p-2"
            />
          </label>
          <button
            onClick={handleSaveBudget}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Save Budget
          </button>
        </div>
      ) : (
        <p>No record found.</p>
      )}
    </div>
  );
}
