import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context";

const Filters = () => {
  const { taskLists, setTaskLists } = useContext(TaskContext);

  const [OriginalTaskLists, setOriginalTaskLists] = useState([]);
  const [filterSelect, setFilterSelect] = useState("all");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("TASKS"));
    if (items) {
      setOriginalTaskLists(items);
    }
  }, []);
  

  const handleClick = (type) => {
    setFilterSelect(type);
    if (type === "all") {
      setTaskLists(OriginalTaskLists);
    }

    if (type === "high") {
      const highPriorityTask = OriginalTaskLists.filter((task) => {
        if (task.priority === "3") return task;
        return false;
      });
      setTaskLists(highPriorityTask);
      return;
    }

    if (type === "medium") {
      const mediumPriorityTask = OriginalTaskLists.filter((task) => {
        if (task.priority === "2") return task;
        return false;
      });
      setTaskLists(mediumPriorityTask);
      return;
    }

    if (type === "low") {
      const lowPriorityTask = OriginalTaskLists.filter((task) => {
        if (task.priority === "1") return task;
        return false;
      });
      setTaskLists(lowPriorityTask);
      return;
    }
  };

  return (
    <div className="filters-wrapper">
      <div className="filter-header">
        <i className="fa-regular fa-calendar-check"></i>
        <p className="title"> Task priority</p>
      </div>

      <div className="filter-btn-list">
        <button
          onClick={() => handleClick("all")}
          className={`btn ${filterSelect === "all" ? "active" : "normal"}`}
        >
          All
        </button>
        <button
          onClick={() => handleClick("high")}
          className={`btn ${filterSelect === "high" ? "active" : "normal"}`}
        >
          High
        </button>
        <button
          onClick={() => handleClick("medium")}
          className={`btn ${filterSelect === "medium" ? "active" : "normal"}`}
        >
          Medium
        </button>
        <button
          onClick={() => handleClick("low")}
          className={`btn ${filterSelect === "low" ? "active" : "normal"}`}
        >
          Low
        </button>
      </div>
    </div>
  );
};

export default Filters;