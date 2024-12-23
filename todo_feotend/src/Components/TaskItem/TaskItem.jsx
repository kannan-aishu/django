import React, { useState } from "react";
import axios from "axios";
import TaskForm from "../TaskForm/TaskForm";

const TaskItem = ({ task, deleteTask, setTasks }) => {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Toggle task completion
  const toggleCompleted = async () => {
    setIsLoading(true); // Set loading state to true
    setError(null); // Reset any previous errors

    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await axios.put(
        `http://localhost:8000/api/tasks/${task.id}/`,
        updatedTask
      );
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? response.data : t))
      );
    } catch (error) {
      setError("Error updating task completion.");
      console.error("Error updating task completion", error);
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <li className="md:flex flex flex-col md:flex-row justify-between items-center gap-[10px] bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200">
      {editing ? (
        <TaskForm taskToEdit={task} setTasks={setTasks} />
      ) : (
        <>
          <span
            className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </span>
          
          {/* Edit Button */}
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 text-white w-[40%] md:w-[10%] bg-yellow-500 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => deleteTask(task.id)}
            className="px-4 py-2 text-white bg-red-600 w-[40%] md:w-[11%] rounded-md hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>

          {/* Mark Completed Button */}
          <button
            onClick={toggleCompleted}
            disabled={isLoading}
            className={`px-4 py-2 ${task.completed ? "bg-green-600" : "bg-blue-600"} text-white rounded-md hover:bg-opacity-80 transition duration-200 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isLoading ? "Processing..." : task.completed ? "Mark Incomplete" : "Mark Completed"}
          </button>
        </>
      )}

      {/* Display error message if there is one */}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </li>
  );
};

export default TaskItem;
