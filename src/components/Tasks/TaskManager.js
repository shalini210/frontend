import React, { useState, useEffect } from 'react';
import './TaskManager.css';
import axios from 'axios';
import { API_URL } from '../../config';
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: '',
    dueDate: '',
    description: '',
    status: 'Pending',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tasks`);
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredTasks(
      tasks.filter((task) => task.title.toLowerCase().includes(value))
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask._id) {
        // Edit task
        const response = await axios.put(
          `${API_URL}/api/tasks/${currentTask._id}`,
          currentTask
        );
        setTasks((prev) =>
          prev.map((task) => (task._id === response.data._id ? response.data : task))
        );
      } else {
        // Add new task
        const response = await axios.post(`${API_URL}/api/tasks`, currentTask);
        setTasks((prev) => [...prev, response.data]);
      }
      setFilteredTasks(tasks);
      setIsEditing(false);
      setCurrentTask({ title: '', dueDate: '', description: '', status: 'Pending' });
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleAddTask = () => {
    setCurrentTask({ title: '', dueDate: '', description: '', status: 'Pending' });
    setIsEditing(true);
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/api/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task._id !== id));
        setFilteredTasks((prev) => prev.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <button onClick={handleAddTask} className="add-task-button">Add Task</button>

      {isEditing ? (
        <div className="task-form">
          <h2>{currentTask._id ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={currentTask.title}
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={currentTask.dueDate.slice(0, 10)} // Format date (only shows date part)
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={currentTask.description}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={currentTask.status}
                onChange={handleFormChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <>
          {filteredTasks.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td onClick={() => handleTaskClick(task)}>{task.title}</td>
                    <td onClick={() => handleTaskClick(task)}>
                      {task.dueDate.slice(0, 10)} {/* Display only the date part */}
                    </td>
                    <td onClick={() => handleTaskClick(task)}>{task.description}</td>
                    <td onClick={() => handleTaskClick(task)}>{task.status}</td>
                    <td>
                      <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskManager;
