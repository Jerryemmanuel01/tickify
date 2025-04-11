import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div
      className="px-6 py-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="bg-white rounded-xl py-8  px-6 w-full md:w-[540px] mx-auto">
        <div className="">
          <h2 className="text-darker font-montserrat font-bold text-lg text-center font-merriweather md:text-3xl  md:leading-10">
            Login to{" "}
            <span className="text-primary font-montserrat">Tickify</span>
          </h2>
          <p className="text-xs md:text-sm  text-center tracking-wide mt-2 md:mt-4">
            Don’t have an account?{" "}
            <Link to="/auth/sign-up" className="text-primary font-semibold">
              Create an account
            </Link>
          </p>
        </div>

        <LoginForm />
      </div>
    </motion.div>
  );
}

export default Login