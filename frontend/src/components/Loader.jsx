import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-inherit text-white">
      <CgSpinner className="animate-spin text-2xl" />
      <p className="animate-pulse text-center">Loading...</p>
    </div>
  );
};

export default Loader;
