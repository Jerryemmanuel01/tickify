import React from "react";
import useLoginForm from "../hooks/useLoginForm";
import { Eye, EyeOff, LockKeyhole, Mail, User, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { formik, setTogglePassword, togglePassword } = useLoginForm();
  return (
    <form className="mt-6 md:mt-7" onSubmit={formik.handleSubmit}>
      <div className="">
        <label
          htmlFor="username"
          className="text-sm font-medium tracking-wide text-darker"
        >
          Username
        </label>
        <div className="border-[#D0D5DD] border w-full px-2 flex items-center gap-2 rounded-md">
          <User2 color="#98A2B3" className="w-[18px]" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Johndoe"
            className={`w-full h-10 text-xs md:text-sm font-medium outline-none tracking-wide text-dark`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </div>
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-[10px] md:text-xs font-semibold">
            {formik.errors.username}
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <label
          htmlFor="password"
          className="text-sm font-medium tracking-wide text-darker"
        >
          Password
        </label>
        <div className="border-[#D0D5DD] border w-full px-2 flex items-center gap-2 rounded-md">
          <LockKeyhole color="#98A2B3" />
          <input
            type={togglePassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="**********"
            className={`w-full h-10 text-xs md:text-sm font-medium outline-none tracking-wide text-dark`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button
            className="outline-none"
            onClick={() => setTogglePassword(!togglePassword)}
            type="button"
          >
            {togglePassword ? (
              <Eye color="#98A2B3" className="w-[18px]" />
            ) : (
              <EyeOff color="#98A2B3" className="w-[18px]" />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-[10px] lg:text-xs font-semibold">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="mt-2 w-full text-right text-primary">
        <Link
          to="/auth/forget-password"
          className="text-xs md:text-sm tracking-wide"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
          className={`${
            !formik.dirty || !formik.isValid
              ? "bg-[#D0D5DD]"
              : "bg-primary hover:bg-primary/95 active:bg-primary duration-300"
          } w-full text-white rounded-lg h-12 px-6 mt-8 text-sm font-semibold outline-none`}
        >
          {""? "Please wait..." : "Login"}
        </button>
      </div>
      
    </form>
  );
};

export default LoginForm;
