import axios from "axios";

const API_URL = "https://to-do-list-eh7q.onrender.com"; // Your backend URL

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Add a task
export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, { task });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Toggle task completion
export const toggleTask = async (id, completed) => {
  try {
    await axios.put(`${API_URL}/tasks/${id}`, { completed });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};