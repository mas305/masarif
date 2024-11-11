import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecordContext } from "../../context/RecordContext";
import { PrimaryBtn } from "./PrimaryBtn";

function MasrofForm() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("basics"); // Default to "basics"
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; // Get the id from location state
  const { record, setRecord } = useContext(RecordContext);

  useEffect(() => {
    if (id) {
      const storedRecord = localStorage.getItem(id);
      if (storedRecord) {
        setRecord(JSON.parse(storedRecord)); // Load the record from localStorage
      }
    }
  }, [id, setRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new item object
    const newItem = {
      itemName,
      price,
      category,
      id: Date.now(), // Use current time as unique ID for each item
    };

    // Check if the record exists
    if (record && id) {
      const updatedRecord = { ...record };

      // Add the new item to the correct category in the record
      updatedRecord.items = [...(updatedRecord.items || []), newItem];

      // Update the record in context and localStorage
      setRecord(updatedRecord);
      localStorage.setItem(id, JSON.stringify(updatedRecord));
    }

    // Reset form fields
    setItemName("");
    setPrice("");
    setCategory("basics"); // Reset category to default
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { id } });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Item</h2>

      <form onSubmit={handleSubmit}>
        {/* Category Radio Buttons */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="basics"
                checked={category === "basics"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Basics
            </label>
            <label>
              <input
                type="radio"
                value="other"
                checked={category === "other"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        {/* Item Name Input */}
        <label htmlFor="itemName" className="block text-sm font-medium mb-2">
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* Price Input */}
        <label htmlFor="price" className="block text-sm font-medium mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className="text-white p-3 font-bold flex flex-col mt-11 gap-y-12">
        <PrimaryBtn
          handleNavigate={handleNavigate}
          path="/monthChart"
          text="عرض مصروفات الشهر"
        />
      </div>

      {/* Display Saved Items */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Saved Items</h3>
        <ul>
          {record?.items?.map((item) => (
            <li key={item.id} className="mb-2 p-2 border rounded">
              <strong>Item Name:</strong> {item.itemName} <br />
              <strong>Price:</strong> ${item.price} <br />
              <strong>Category:</strong> {item.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MasrofForm;
