import { createContext, useEffect, useState } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || []
  );
    // Save items to local storage whenever items array changes
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
      }, [items]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};
