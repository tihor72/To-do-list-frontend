import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!taskTitle) return;
    try {
      const response = await axios.post('http://localhost:5000/tasks', { title: taskTitle });
      setTasks([...tasks, response.data]);
      setTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });


  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          <span>{task.title}</span>
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id, task.completed)} // This should trigger properly
            />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </li>        
        ))}
      </ul>
    </div>
  );
}

export default App;