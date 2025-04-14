import useAddTasks from "../hooks/useAddTasks";
import {PiSpinner} from "react-icons/pi"

const Taskform = () => {
  const { formik, isAddTaskLoading } = useAddTasks();
  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="border border-borderColor h-10 md:h-12 rounded-lg flex items-center w-full font-exo">
        <input
          type="text"
          name="title"
          id="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full h-full rounded-s-lg outline-none px-4 text-sm font-medium placeholder:text-gray/90 placeholder:font-normal text-darker"
          placeholder="Write out your daily activities..."
        />

        <button
          type="submit"
          className="text-nowrap text-white text-sm font-semibold bg-gradient-to-br from-black to-primary/50 rounded-e-lg px-6 h-full hover:bg-gradient-to-tr active:from-primary/50"
        >
           {isAddTaskLoading? <PiSpinner className="animate-spin"/>: "Add Task"}
        </button>
      </div>
      {formik.touched.title && formik.errors.title ? (
        <div className="text-red-500 text-[10px] lg:text-xs font-semibold">
          {formik.errors.title}
        </div>
      ) : null}
    </form>
  );
};

export default Taskform;
