import { useContext, useState, useEffect } from "react";
import Filters from "./Filters";
import { TaskContext } from "../context";

const Sidebar = () => {
  const [searchText, setSearchText] = useState("");
  const [OriginalTaskLists, setOriginalTaskLists] = useState([]);
  const { setTaskLists } = useContext(TaskContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("TASKS"));
    if (items) {
      setOriginalTaskLists(items);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.value !== "") {
      const filteredTasks = OriginalTaskLists.filter((task) => {
        if (task?.message.toLowerCase().includes(e.target.value.toLowerCase())) return task;
        return false;
      });
      setTaskLists(filteredTasks);
    } else {
      setTaskLists(OriginalTaskLists);
    }
    setSearchText(e.target.value);
  };

  return (
    <div className="sidebar">
      <div className="container">
        <div className="search-tasks">
          <input
            className="search"
            type="text"
            name="search"
            placeholder="Search Tasks"
            value={searchText}
            onChange={handleChange}
          />
        </div>

        <Filters />
      </div>
    </div>
  );
};

export default Sidebar;