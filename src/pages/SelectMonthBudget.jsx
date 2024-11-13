import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectBudget() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [customBudgetName, setCustomBudgetName] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [existingBudgets, setExistingBudgets] = useState([]); // Renamed customBudgets to existingBudgets
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
    // Load existing budgets (both month and custom) from local storage on component mount
    const savedExistingBudgets =
      JSON.parse(localStorage.getItem("existingBudgets")) || [];
    setExistingBudgets(savedExistingBudgets);
  }, []);

  const checkDuplicate = (year, budgetName) => {
    const allRecords = Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    const duplicateRecord = allRecords.find(
      (record) => record.year === year && record.budgetName === budgetName
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

    const budgetName = customBudgetName.trim() || selectedMonth;

    if (!budgetName) {
      setErrorMessage("Please provide a valid budget name.");
      return;
    }

    // If selecting an existing budget, skip the budget validation
    if (!isDuplicate && (!selectedBudget || selectedBudget <= 0)) {
      setErrorMessage("Please enter a valid budget amount greater than 0.");
      return;
    }

    if (isDuplicate) {
      navigate("/masrofDetails", { state: { id: existingId } });
      return;
    }

    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const selectedData = {
      id,
      year: currentYear,
      budgetName,
      budget: selectedBudget,
    };
    localStorage.setItem(id, JSON.stringify(selectedData));

    // Update existingBudgets in state and localStorage
    const updatedExistingBudgets = [
      ...existingBudgets,
      { name: budgetName, type: customBudgetName.trim() ? "custom" : "month" },
    ];
    setExistingBudgets(updatedExistingBudgets);
    localStorage.setItem(
      "existingBudgets",
      JSON.stringify(updatedExistingBudgets)
    );

    setErrorMessage("");
    navigate("/masrofDetails", { state: { id } });
  };

  useEffect(() => {
    const budgetName = customBudgetName.trim() || selectedMonth;
    if (budgetName) {
      checkDuplicate(currentYear, budgetName);
    }
  }, [currentYear, selectedMonth, customBudgetName]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Select Budget</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <h3 className="text-6xl font-bold text-center my-12">{currentYear}</h3>

        <label htmlFor="month" className="block text-sm font-medium mb-2">
          Select Month
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setCustomBudgetName("");
          }}
          className="w-full p-2 mb-4 border rounded"
          disabled={customBudgetName || existingId}
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

        <label htmlFor="customName" className="block text-sm font-medium mb-2">
          Or enter a custom budget name
        </label>
        <input
          type="text"
          id="customName"
          value={customBudgetName}
          onChange={(e) => {
            setCustomBudgetName(e.target.value);
            setSelectedMonth("");
          }}
          placeholder="Enter custom budget name"
          className="w-full p-2 mb-4 border rounded"
          disabled={existingId}
        />

        {/* Dropdown to select existing budgets */}
        {existingBudgets.length > 0 && (
          <>
            <label
              htmlFor="existingBudgetSelect"
              className="block text-sm font-medium mb-2"
            >
              Select Existing Budget
            </label>
            <select
              id="existingBudgetSelect"
              onChange={(e) => {
                setCustomBudgetName(e.target.value);
                setSelectedMonth("");
              }}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select an existing budget</option>
              {existingBudgets.map((budget, index) => (
                <option key={index} value={budget.name}>
                  {budget.name} ({budget.type})
                </option>
              ))}
            </select>
          </>
        )}

        {/* Don't show the budget amount input if an existing budget is selected */}
        {(!isDuplicate || selectedMonth || customBudgetName.trim()) && (
          <div>
            <label htmlFor="budget" className="block text-sm font-medium mb-2">
              Enter Budget Amount
            </label>
            <input
              type="number"
              id="budget"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              placeholder="Enter budget amount"
              className="w-full p-2 mb-4 border rounded"
              disabled={existingId}
            />
          </div>
        )}

        {(selectedMonth || customBudgetName.trim() || existingId) && (
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isDuplicate ? "View Budget Chart" : "Submit"}
          </button>
        )}
      </form>
    </div>
  );
}
