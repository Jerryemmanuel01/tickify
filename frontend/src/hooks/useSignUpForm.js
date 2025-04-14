import { signUpSchema } from "../lib/schema.js";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, signUp } from "../services/features/auth/authSlice.js";

const useSignUpForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleCPassword, setToggleCPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(String(message));
      navigate("/auth/login");
    }
    if (isError) toast.error(message);
    dispatch(reset());
    return;
  }, [isSuccess, isError, message]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: ({ email, password, username } = values) => {
      const userData = { email, password, username };
      dispatch(signUp(userData));
    },
  });

  return {
    formik,
    togglePassword,
    toggleCPassword,
    setTogglePassword,
    setToggleCPassword,
    isLoading,
    isSuccess,
    message,
  };
};

export default useSignUpForm;
