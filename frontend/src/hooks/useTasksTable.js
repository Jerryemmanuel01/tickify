import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTask,
  deleteTask,
  editTask,
  getTasks,
  reset,
} from "../services/features/tasks/taskSlice";
import { useFormik } from "formik";
import { taskSchema } from "../lib/schema";

const useTasksTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState("");

  const dispatch = useDispatch();

  const {
    tasks,
    isLoading,
    isSuccess,
    message,
    isError,
    isEditTaskSuccess,
    isEditTaskLoading,
    isDeleteTaskLoading,
    isDeleteTaskSuccess,
    isCompleteTaskSuccess,
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (isSuccess && message !== "Tasks fetch successful") {
      toast.success(message);
      dispatch(reset());
      return;
    }
    if (isEditTaskSuccess && message === "Task Edited Successful") {
      formik.resetForm();
      toast.success(message);
      setShowModal(false);
      setTaskId("");
      dispatch(getTasks());
      dispatch(reset());
      return;
    }
    if (isDeleteTaskSuccess && message === "Task Deleted Successful") {
      toast.success(message);
      setDeleteModal(false);
      setTaskId("");
      dispatch(getTasks());
      return;
    }
    if (
      isCompleteTaskSuccess &&
      (message === "Task Completed Successful" ||
        message === "Task Reactivated Successful")
    ) {
      toast.success(message);
      setTaskId("");
      dispatch(getTasks());
      dispatch(reset());
      return;
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
    return;
  }, [
    isSuccess,
    isError,
    message,
    isDeleteTaskSuccess,
    isEditTaskSuccess,
    isCompleteTaskSuccess,
  ]);

  useEffect(() => {
    const sortedTasks = tasks
      ? [...tasks]?.sort((a, b) => {
          return a.completed - b.completed;
        })
      : [];
    setAllTasks(sortedTasks);
  }, [tasks]);

  const clickedTask = tasks?.find((task) => task._id === taskId);

  const handleDeleteTask = () => {
    dispatch(deleteTask({ data: { _id: taskId } }));
  };

  const handleCompleteTask = (id) => {
    const userData = {
      _id: id,
    };
    dispatch(completeTask(userData));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: clickedTask?.title || "",
    },
    validationSchema: taskSchema,
    onSubmit: ({ title } = values) => {
      if (title === clickedTask?.title) return toast.error("Task not changed");
      const editData = {
        title,
        _id: taskId,
      };

      dispatch(editTask(editData));
    },
  });

  return {
    tasks,
    isLoading,
    showModal,
    setShowModal,
    deleteModal,
    setDeleteModal,
    setTaskId,
    formik,
    isEditTaskLoading,
    handleDeleteTask,
    handleCompleteTask,
    isDeleteTaskLoading,
    allTasks,
  };
};

export default useTasksTable;
