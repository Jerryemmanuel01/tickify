import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTasks, reset } from "../services/features/tasks/taskSlice";
import { useFormik } from "formik";
import { taskSchema } from "../lib/schema";

const useAddTasks = () => {
  const dispatch = useDispatch();

  const { isAddTaskLoading, isAddTaskSuccess, message, isError } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isAddTaskSuccess) {
      dispatch(getTasks())
      formik.resetForm();
      toast.success(message);
      dispatch(reset())
      return
    }
    dispatch(reset());
    return;
  }, [isAddTaskSuccess, isError, message]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: taskSchema,
    onSubmit: (values) => {
      dispatch(addTask(values));
    },
  });

  return { isAddTaskLoading, formik };
};

export default useAddTasks;
