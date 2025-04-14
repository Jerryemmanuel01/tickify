import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar"

const index = () => {
  return (
    <section className="w-full min-h-[90vh] bg-gradient-to-br from-primary to-black">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </section>
  );
};

export default index;
