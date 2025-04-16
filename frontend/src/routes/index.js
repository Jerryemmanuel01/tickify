import { lazy } from "react";

export const Home = lazy(() => import("../pages/dashboard/index.jsx"));

// auth routes
export const Login = lazy(() => import("../pages/auth/Login.jsx"));
export const SignUp = lazy(() => import("../pages/auth/SignUp.jsx"));
export const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword.jsx"));
export const ResetPassword = lazy(() => import("../pages/auth/ResetPassword.jsx"));
