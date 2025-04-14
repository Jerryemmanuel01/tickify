import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
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
    if (isEditTaskSuccess) {
      setShowModal(false);
      formik.resetForm();
      dispatch(getTasks());
      toast.success(message);
      dispatch(reset());
      return;
    }
    if (isError) toast.error(message);
    dispatch(reset());
    return;
  }, [isSuccess, isError, message]);

  const clickedTask = tasks?.find((task) => task._id === taskId);

  const handleDeleteTask = () => {
    dispatch(deleteTask({ _id: taskId }));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: clickedTask?.title || "",
    },
    validationSchema: taskSchema,
    onSubmit: ({ title } = values) => {
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
  };
};

export default useTasksTable;
