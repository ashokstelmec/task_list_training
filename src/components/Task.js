import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Dialog from "./Dialog";
import { AUTH_TOKEN } from "../utils";

const Task = ({ item, handleDelete, getTasksLists, users }) => {
  const [openModal, setOpenModal] = useState(false);
  const [task, setTask] = useState({
    message: "",
    dueDate: "",
    assignedTo: "",
    priority: "",
  });

  useEffect(() => {
    setTask(item);
  }, [item]);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setTask((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
  };

  const updateTask = async () => {
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

      await fetch("https://devza.com/tests/tasks/update", requestOptions);
      getTasksLists();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  // This function will edit or update in backend
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask();
  };

  return (
    <>
      {item && (
        <tr className="table-row">
          <td className="message-data">{item.message}</td>
          <td className="message-name">{item.assigned_name}</td>
          <td>{item.priority}</td>
          <td className="creating-date">{item.created_on}</td>
          <td className="edit-icon">
            <FiEdit onClick={onOpenModal} />
          </td>
          <td className="delete-icon">
            <MdOutlineDelete onClick={() => handleDelete(item.id)} />
          </td>
        </tr>
      )}

      <Dialog
        open={openModal}
        onCloseModal={onCloseModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        task={task}
        users={users}
      />
    </>
  );
};

export default Task;