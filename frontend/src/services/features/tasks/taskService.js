import axiosClient from "../../api/axiosClient";

const getTasks = async () => {
  const response = await axiosClient.get(`/task/tasks`);
  if (response.data.success === true) {
    localStorage.setItem("Tfy_tasks", JSON.stringify(response.data.data));
  }

  return response.data;
};

const addTasks = async (task) => {
  const response = await axiosClient.post(`/task/add-task`, task);

  return response.data;
};

const editTask = async (taskData) => {
  const response = await axiosClient.patch(`/task/edit-task`, taskData);

  return response.data;
};

const completeTask = async (taskData) => {
  console.log(taskData);
  const response = await axiosClient.patch(`/task/complete-task`, taskData);

  return response.data;
};

const deleteTask = async (taskData) => {
  console.log(taskData);
  
  const response = await axiosClient.delete(`/task/delete-task`, taskData);

  return response.data;
};

const taskService = {
  getTasks,
  addTasks,
  editTask,
  completeTask,
  deleteTask,
};

export default taskService;
