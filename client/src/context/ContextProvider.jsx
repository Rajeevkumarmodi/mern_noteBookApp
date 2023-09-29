import { useState } from "react";
import MyContext from "./myContext";

function ContextProvider({ children }) {
  const [allNotesData, setAllNotesData] = useState({});
  return (
    <MyContext.Provider value={{ allNotesData, setAllNotesData }}>
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
