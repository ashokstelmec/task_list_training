import { createContext, useState } from "react";

export const TaskContext = createContext();

const AppProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);

  return (
    <TaskContext.Provider value={{ taskLists, setTaskLists }}>
      {children}
    </TaskContext.Provider>
  );
};

export default AppProvider;