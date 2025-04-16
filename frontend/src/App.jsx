import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./layouts";
import Dashboard from "./pages/dashboard";
// import Login from "./pages/auth/Login";
// import SignUp from "./pages/auth/SignUp";
import ProtectRoutes from "./pages/ProtectRoutes";
import ProtectAuths from "./pages/ProtectAuths";
import { Home, ForgetPassword, Login, ResetPassword, SignUp } from "./routes";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/",
          element: <ProtectRoutes element={<Layout />} />,
          children: [
            {
              path: "/home",
              element: <Home />,
            },
          ],
        },

        {
          path: "/auth",
          element: <ProtectAuths element={<Layout />} />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "sign-up",
              element: <SignUp />,
            },
            {
              path: "reset-password/:token",
              element: <ResetPassword />,
            },
            {
              path: "forget-password",
              element: <ForgetPassword />,
            },
          ],
        },
      ])}
    />
  );
}

export default App;
