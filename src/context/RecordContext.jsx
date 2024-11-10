import { createContext, useState } from "react";

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
  const [record, setRecord] = useState(null);

  return (
    <RecordContext.Provider value={{ record, setRecord }}>
      {children}
    </RecordContext.Provider>
  );
};
