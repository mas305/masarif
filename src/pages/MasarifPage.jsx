import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export default function MasarifPage() {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  // Filter items based on the selected category
  const filteredItems =
    categoryFilter === "All"
      ? items
      : items.filter((item) => item.category === categoryFilter);

  useEffect(() => {
    const price = filteredItems.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    setTotalPrice(price);
  }, [filteredItems]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Saved Items</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="block text-sm font-medium mb-2"
        >
          Filter by Category
        </label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="أساسيات">أساسيات</option>
          <option value="بيت">بيت</option>
          {/* Add more categories here if needed */}
        </select>
      </div>

      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} className="mb-4 p-4 border rounded">
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <p>
                <strong>Price:</strong> {item.price}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found for the selected category.</p>
      )}
      <div>totalPrice : {totalPrice}</div>
    </div>
  );
}
