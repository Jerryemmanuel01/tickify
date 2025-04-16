import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import useResetPassword from "../hooks/useResetPassword";

const ResetPasswordForm = () => {
  const {
    formik,
    isLoading,
    setToggleConfirmPassword,
    toggleConfirmPassword,
    setTogglePassword,
    togglePassword,
  } = useResetPassword();
  return (
    <form className="mt-6 md:mt-7" onSubmit={formik.handleSubmit}>
      <div className="">
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

      <div className="mt-6">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium tracking-wide text-darker"
        >
          Confirm Password
        </label>
        <div className="border-[#D0D5DD] border w-full px-2 flex items-center gap-2 rounded-md">
          <LockKeyhole color="#98A2B3" />
          <input
            type={toggleConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="**********"
            className={`w-full h-10 text-xs md:text-sm font-medium outline-none tracking-wide text-dark`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <button
            className="outline-none"
            onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
            type="button"
          >
            {toggleConfirmPassword ? (
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

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={!formik.dirty || !formik.isValid || isLoading}
          className={`${
            !formik.dirty || !formik.isValid || isLoading
              ? "bg-[#D0D5DD]"
              : "bg-primary hover:bg-primary/95 active:bg-primary duration-300"
          } w-full text-white rounded-lg h-12 px-6 mt-8 text-sm font-semibold outline-none`}
        >
          {isLoading ? "Please wait..." : "Reset"}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
