import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../lib/schema.js";

const useLoginForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      //   dispatch(login(values));
      console.log(values);
    },
  });

  return {
    formik,
    togglePassword,
    setTogglePassword,
  };
};

export default useLoginForm;
