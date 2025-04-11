import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";


const SignUp = () => {
  return (
    <motion.div
      className="px-6 py-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="bg-white rounded-xl py-8  px-6 w-full md:w-[540px] mx-auto">
        <div>
          <h1 className="text-darker font-montserrat text-xl md:text-3xl font-bold text-center">
            Tickify
          </h1>
          <p className="text-xs md:text-sm  text-center tracking-wide mt-2 md:mt-2.5 text-secondary font-semibold font-lato">
            Simplify Your Day, One Task at a Time
          </p>
          <h2 className="font-lato text-secondary font-bold leading-6 mt-6 ">
            Create an account
          </h2>
          <p className="leading-5 tracking-wide text-xs mt-2">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>

        <SignUpForm />
      </div>
    </motion.div>
  );
}

export default SignUp