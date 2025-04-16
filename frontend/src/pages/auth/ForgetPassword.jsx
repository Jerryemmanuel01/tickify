import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { motion } from "framer-motion";
import ForgetPasswordForm from "../../components/ForgetPasswordForm";
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgetPassword = () => {
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
        <button onClick={()=>navigate(-1)} className="outline-none flex items-center gap-2 text-white">
          <FaArrowLeftLong /> Back
        </button>
      </div>
      <div className="bg-white rounded-xl py-8 mt-4 px-6 w-full md:w-[540px] mx-auto">
        <div className="">
          <h2 className="text-darker font-montserrat font-bold text-lg text-center font-merriweather md:text-3xl  md:leading-10">
            Forget Your{" "}
            <span className="text-primary font-montserrat">Password?</span>
          </h2>
          <p className="text-xs md:text-sm  text-center tracking-wide mt-2 md:mt-4 text-darker">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <ForgetPasswordForm />
      </div>
    </motion.div>
  );
};

export default ForgetPassword;
