import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ResetPasswordSchema } from "../lib/schema.js";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetPassword } from "../services/features/auth/authSlice.js";

const useResetPassword = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );
  const { token } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const email = queryParams.get("email");

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
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: ({ confirmPassword, password } = values) => {
      const userData = { confirmPassword, password, email, token };

      dispatch(resetPassword(userData));
    },
  });

  return {
    formik,
    isLoading,
    toggleConfirmPassword,
    setToggleConfirmPassword,
    togglePassword,
    setTogglePassword,
  };
};

export default useResetPassword;
