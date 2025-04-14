import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar"

const index = () => {
  return (
    <section
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      className="w-full overflow-hidden min-h-[100vh] bg-gradient-to-br from-primary to-black pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] "
    >
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </section>
  );
};

export default index;
