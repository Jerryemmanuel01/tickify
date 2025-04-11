import { Link } from "react-router-dom";
import useSignUpForm from "../hooks/useSignUpForm";
import { Eye, EyeOff, LockKeyhole, Mail, User2 } from "lucide-react";

const SignUpForm = () => {
  const {
    formik,
    setToggleCPassword,
    setTogglePassword,
    toggleCPassword,
    togglePassword,
  } = useSignUpForm();
  return (
    <div className="bg-white w-full">
      <form className="mt-6" onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="">
          <label
            htmlFor="username"
            className="text-sm font-medium tracking-wide text-darker"
          >
            Username
          </label>
          <div className="border-[#D0D5DD] border w-full px-2 md:px-4 flex items-center gap-2 rounded-md">
            <label htmlFor="username">
              <User2 color="#98A2B3" className="w-[18px]" />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="JohnDoe"
              className={`w-full text-xs md:text-sm h-10 font-medium outline-none tracking-wide text-dark`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-[10px] lg:text-xs font-semibold">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
        {/* Email */}
        <div className="mt-4">
          <label
            htmlFor="email"
            className="text-sm font-medium tracking-wide text-darker"
          >
            Email
          </label>
          <div className="border-[#D0D5DD] border w-full px-2 md:px-4 flex items-center gap-2 rounded-md">
            <Mail color="#98A2B3" className="w-[18px]" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="handyman@example.com"
              className={`w-full text-xs md:text-sm h-10 font-medium outline-none tracking-wide text-dark`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-[10px] lg:text-xs font-semibold">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        {/* Password */}
        <div className="mt-4">
          <label
            htmlFor="password"
            className="text-sm font-medium tracking-wide text-darker"
          >
            Password
          </label>
          <div className="border-[#D0D5DD] border w-full px-2 md:px-4 flex items-center gap-2 rounded-md">
            <LockKeyhole color="#98A2B3" className="w-[18px]" />
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Choose a password"
              className={`w-full text-xs md:text-sm h-10 font-medium outline-none tracking-wide text-dark`}
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
        {/* Confirm Password */}
        <div className="mt-4">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium tracking-wide text-darker"
          >
            Confirm Password
          </label>
          <div className="border-[#D0D5DD] border w-full px-2 md:px-4 flex items-center gap-2 rounded-md">
            <LockKeyhole color="#98A2B3" className="w-[18px]" />
            <input
              type={toggleCPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className={`w-full text-xs md:text-sm h-10 font-medium outline-none tracking-wide text-dark`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <button
              className="outline-none"
              onClick={() => setToggleCPassword(!toggleCPassword)}
              type="button"
            >
              {toggleCPassword ? (
                <Eye color="#98A2B3" className="w-[18px]" />
              ) : (
                <EyeOff color="#98A2B3" className="w-[18px]" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-[10px] lg:text-xs font-semibold">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        {/* Terms & Conditions */}

        {/* Submit btn */}
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
            {"" ? "Please wait..." : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
