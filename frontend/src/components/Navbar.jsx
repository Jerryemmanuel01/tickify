import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/tickify-logo.png";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout, resetToken } from "../services/features/auth/authSlice";

const Navbar = () => {
  const token = Cookies.get("Tfy_access_token");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetToken())
    navigate("/auth/login")
  };

  return (
    <motion.div
      className="w-full h-[80px] shadow-custom1 px-4 pr-6 py-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[1200px] mx-auto h-full">
        <div className="flex items-center justify-between gap-6 h-full w-full">
          <Link className="flex items-center justify-center" to="/home">
            <img src={logo} alt="" className="h- w-[200px] min-w-[100px]" />
          </Link>
          {token ? (
            <div className="">
              <button onClick={handleLogout} className="font-lato font-semibold text-white text-sm px-6 py-2 rounded-md border border-lighter bg-gradient-to-br from-secondary/90 to-light/80 h-full hover:bg-gradient-to-tr active:from-light duration-300">
                Logout
              </button>
            </div>
          ) : (
            <div className="text-white flex items-center gap-4">
              <Link
                to="/auth/login"
                className="font-lato font-semibold text-[11px] sm:text-sm px-6 py-2 rounded-md border border-light bg-gradient-to-br from-black to-primary/50 h-full hover:bg-gradient-to-tr active:from-primary/50 duration-300"
              >
                Login
              </Link>
              <Link
                to="/auth/sign-up"
                className="font-lato font-semibold text-nowrap text-[11px] sm:text-sm px-6 py-2 rounded-md border border-lighter bg-gradient-to-br from-secondary/90 to-light/80 h-full hover:bg-gradient-to-tr active:from-light duration-300"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
