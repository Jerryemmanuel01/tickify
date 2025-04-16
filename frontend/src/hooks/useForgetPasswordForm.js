import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgetPasswordSchema } from "../lib/schema.js";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, reset } from "../services/features/auth/authSlice.js";

const useForgetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate("/auth/login");
    }
    if (isError) toast.error(message);
    dispatch(reset());
    return;
  }, [isSuccess, isError, message]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgetPassword(values));
    },
  });

  return {
    formik,
    isLoading,
  };
};

export default useForgetPasswordForm;
