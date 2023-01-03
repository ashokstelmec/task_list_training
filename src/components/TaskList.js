import { useEffect, useState, useContext } from "react";
import Dialog from "./Dialog";
import { AUTH_TOKEN } from "../utils";
import Task from "./Task";
import { TaskContext } from "../context";

const TaskList = () => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    message: "",
    dueDate: "",
    assignedTo: "",
    priority: "",
  });

  const { taskLists, setTaskLists } = useContext(TaskContext);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [users, setUsers] = useState([]);

  const getUserList = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        redirect: "follow",
      };

      const response = await fetch(
        "https://devza.com/tests/tasks/listusers",
        requestOptions
      );
      const data = await response.json();
      setUsers(data?.users);
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const getTasksLists = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        redirect: "follow",
      };

      const response = await fetch(
        "https://devza.com/tests/tasks/list",
        requestOptions
      );
      const data = await response.json();
      localStorage.setItem("TASKS", JSON.stringify(data?.tasks));
      setTaskLists(data?.tasks);
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  useEffect(() => {
    getTasksLists();
  }, []);

  const handleDelete = async (id) => {
    try {
      const formdata = new FormData();
      formdata.append("taskid", id);

      const requestOptions = {
        method: "POST",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        body: formdata,
        redirect: "follow",
      };

      await fetch("https://devza.com/tests/tasks/delete", requestOptions);

      getTasksLists();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  const handleChange = (e) => {
    setTask((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
  };

  const addNewTask = async () => {
    try {
      const formdata = new FormData();
      formdata.append("message", task.message);
      formdata.append("due_date", task.dueDate);
      formdata.append("priority", task.priority);
      formdata.append("assigned_to", task.assignedTo);

      const requestOptions = {
        method: "POST",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        body: formdata,
        redirect: "follow",
      };

      await fetch("https://devza.com/tests/tasks/create", requestOptions);
      getTasksLists();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST REQUEST TO BACKEND.
    addNewTask();
  };

  return (
    <div className="task-list container">
      <div className="task-list-header">
        <p className="title">List of Tasks</p>
        <div className="task-list-filter">
          <select>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>

          <button className="add-task-btn" onClick={onOpenModal}>
            <i className="fa fa-plus"></i> Add Task
          </button>
        </div>
      </div>
      <table className="displaying-data">
        <tbody>
          {taskLists?.map((taskItem, i) => (
            <Task
              key={i}
              item={taskItem}
              handleDelete={handleDelete}
              getTasksLists={getTasksLists}
              users={users}
            />
          ))}
        </tbody>
      </table>
      <Dialog
        open={open}
        onCloseModal={onCloseModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        task={task}
        users={users}
      />
    </div>
  );
};

export default TaskList;
