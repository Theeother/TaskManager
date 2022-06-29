import axios from 'axios';

const baseUrl = 'https://localhost:8000/api/todo/';

const getAllTasks = () => axios.get(baseUrl);

const getTask = async (id) => {
  const response = await axios.get(`${baseUrl}${id}`);
  return response.data;
};

const createTask = async (task) => {
  const response = await axios.post(`${baseUrl}create`, JSON.stringify(task));
  return response.data;
};

const updateTask = async (task) => {
  const response = await axios.put(`${baseUrl}update`, JSON.stringify(task));
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axios.delete(`${baseUrl}delete/${id}`);
  return response.data;
};

export default {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
