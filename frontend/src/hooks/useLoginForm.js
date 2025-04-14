import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../lib/schema.js";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../services/features/auth/authSlice.js";

const useLoginForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(String(message));
      navigate("/");
    }
    if (isError) toast.error(message);
    dispatch(reset());
    return;
  }, [isSuccess, isError, message]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return {
    formik,
    togglePassword,
    setTogglePassword,
    isLoading,
  };
};

export default useLoginForm;
