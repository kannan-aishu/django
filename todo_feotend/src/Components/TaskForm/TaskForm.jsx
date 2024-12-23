// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ taskToEdit, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCompleted(taskToEdit.completed);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, completed };

    try {
      if (taskToEdit) {
        // Update an existing task
        const response = await axios.put(
          `http://localhost:8000/api/tasks/${taskToEdit.id}/`,
          taskData
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskToEdit.id ? response.data : task))
        );
      } else {
        // Create a new task
        const response = await axios.post(
          "http://localhost:8000/api/tasks/",
          taskData
        );
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
      setTitle("");
      setDescription("");
      setCompleted(false);
    } catch (error) {
      console.error("Error submitting task", error);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {taskToEdit ? "Edit Task" : "Create Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              className="form-checkbox"
            />
            <span>Completed</span>
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          {taskToEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
