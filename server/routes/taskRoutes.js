import express from "express";
import { authentication } from "../middlewares/validator.js";
import {
  addTask,
  allTasks,
  completeTask,
  deleteTask,
  editTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", authentication, allTasks);
router.post("/add-task", authentication, addTask);
router.patch("/edit-task", authentication, editTask);
router.patch("/complete-task", authentication, completeTask);
router.delete("/delete-task", authentication, deleteTask);

export default router;
