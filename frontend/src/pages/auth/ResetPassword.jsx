import { motion } from "framer-motion";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="px-6 py-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="w-full md:w-[540px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="outline-none flex items-center gap-2 text-white"
        >
          <FaArrowLeftLong /> Back
        </button>
      </div>
      <div className="bg-white rounded-xl py-8 mt-4 px-6 w-full md:w-[540px] mx-auto">
        <div className="">
          <h2 className="text-darker font-montserrat font-bold text-lg text-center font-merriweather md:text-3xl  md:leading-10">
            Reset Your{" "}
            <span className="text-primary font-montserrat">Password</span>
          </h2>
          <p className="text-xs md:text-sm  text-center tracking-wide mt-2 md:mt-4">
            Set a new password to regain access to your account.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </motion.div>
  );
};

export default ResetPassword;
