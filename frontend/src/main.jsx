import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.jsx";

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loader />}>
    <Toaster />

    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
