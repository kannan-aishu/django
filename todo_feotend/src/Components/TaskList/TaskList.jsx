import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../TaskForm/TaskForm";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks/");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      {/* Task Form Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Task</h2>
        <TaskForm setTasks={setTasks} />
      </div>

      {/* Task List Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task List</h2>
      {loading ? (
        <p className="text-lg text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              setTasks={setTasks}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
