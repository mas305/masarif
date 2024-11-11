import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectMonthBudget() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  // const [currentYear, setcurrentYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [disabledMonths, setDisabledMonths] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [existingId, setExistingId] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const savedDisabledMonths =
      JSON.parse(localStorage.getItem("disabledMonths")) || [];
    setDisabledMonths(savedDisabledMonths);
  }, []);

  const checkDuplicate = (year, month) => {
    const allRecords = Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    const duplicateRecord = allRecords.find(
      (record) => record.year === year && record.month === month
    );

    if (duplicateRecord) {
      setIsDuplicate(true);
      setExistingId(duplicateRecord.id);
    } else {
      setIsDuplicate(false);
      setExistingId(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDuplicate) {
      // Navigate to /monthChart if record already exists
      navigate("/masrofDetails", { state: { id: existingId } });
      return;
    }

    // Generate a unique ID for the new record
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const selectedData = {
      id,
      year: currentYear,
      month: selectedMonth,
      budget: selectedBudget,
    };

    // Save the record to localStorage
    localStorage.setItem(id, JSON.stringify(selectedData));

    // Update disabled months
    const updatedDisabledMonths = [...disabledMonths, selectedMonth];
    localStorage.setItem(
      "disabledMonths",
      JSON.stringify(updatedDisabledMonths)
    );
    setDisabledMonths(updatedDisabledMonths);

    // Clear the error message and navigate to the home page
    setErrorMessage("");
    navigate("/masrofDetails", { state: { id } });
  };

  useEffect(() => {
    if (selectedMonth) {
      checkDuplicate(currentYear, selectedMonth);
    }
  }, [currentYear, selectedMonth]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Select Month and Year</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <h3 className="text-6xl font-bold text-center my-12">{currentYear}</h3>

        <label htmlFor="month" className="block text-sm font-medium mb-2">
          Select Month
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="" disabled>
            Select a month
          </option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Show the budget input only if the selection is not a duplicate */}
        {!isDuplicate && selectedMonth && (
          <div>
            <label htmlFor="budget" className="block text-sm font-medium mb-2">
              Enter Monthly Budget
            </label>
            <input
              type="number"
              id="budget"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              placeholder="Enter budget amount"
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        )}

        {/* Show the submit button only when a month is selected */}
        {selectedMonth && (
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isDuplicate ? "View Month Chart" : "Submit"}
          </button>
        )}
      </form>
    </div>
  );
}
