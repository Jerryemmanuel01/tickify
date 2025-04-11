import { signUpSchema } from "../lib/schema.js";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useSignUpForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleCPassword, setToggleCPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return {
    formik,
    togglePassword,
    toggleCPassword,
    setTogglePassword,
    setToggleCPassword,
  };
};

export default useSignUpForm;
