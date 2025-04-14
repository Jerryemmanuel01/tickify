import Task from "../models/taskModel.js";

export const allTasks = async (req, res) => {
  const userId = req.user.userId;
  try {
    const tasks = await Task.find({ user: userId });

    res
      .status(200)
      .json({ success: true, message: "Tasks fetch successful", data: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title } = req.body;

    const userId = req.user.userId;

    const newTask = new Task({
      title,
      user: userId,
    });
    await newTask.save();

    res.status(200).json({
      success: true,
      message: "Task added successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTask = async (req, res) => {
  try {
    const { _id, title } = req.body;
    const task = await Task.findOne({ _id });

    if (!task) {
      return res
        .status(401)
        .json({ success: false, message: "Task not found!" });
    }
    task.title = title;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Edited",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const { _id } = req.body;

    const task = await Task.findOne({ _id });

    if (!task) {
      return res
        .status(401)
        .json({ success: false, message: "Task not found!" });
    }

    task.completed = true;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Completed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { _id } = req.body;

    const task = await Task.findOne({ _id });

    if (!task) {
      return res
        .status(401)
        .json({ success: false, message: "Task not found!" });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
