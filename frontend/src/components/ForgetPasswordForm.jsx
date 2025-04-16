import { Mail } from "lucide-react";
import useForgetPasswordForm from "../hooks/useForgetPasswordForm";

const ForgetPasswordForm = () => {
  const { formik, isLoading } = useForgetPasswordForm();
  return (
    <form className="mt-6 md:mt-7" onSubmit={formik.handleSubmit}>
      <div className="">
        <label
          htmlFor="email"
          className="text-sm font-medium tracking-wide text-darker"
        >
          Email
        </label>
        <div className="border-[#D0D5DD] border w-full px-2 flex items-center gap-2 rounded-md">
          <label htmlFor="email">
            <Mail color="#98A2B3" className="w-[18px]" />
          </label>

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Tickify@gmail.com"
            className={`w-full h-10 text-xs md:text-sm font-medium outline-none tracking-wide text-dark`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-[10px] md:text-xs font-semibold">
            {formik.errors.email}
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
          } w-full text-white rounded-lg h-10 px-6 mt-8 text-sm font-semibold outline-none`}
        >
          {isLoading ? "Please wait..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
