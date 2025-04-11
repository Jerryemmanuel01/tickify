import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./layouts";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Dashboard />,
            },
          ],
        },

        {
          path: "/auth",
          element: <Layout />,
          children: [
            {
              path: "login",
              element: <Login />
            },
            {
              path: "sign-up",
              element: <SignUp />
            }
          ]
        }
      ])}
    />
  );
}

export default App;
