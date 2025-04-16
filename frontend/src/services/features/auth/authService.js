import axiosClient from "../../api/axiosClient";
import Cookies from "js-cookie";

const sign_up = async (userData) => {
  const response = await axiosClient.post(`/auth/signup`, userData);

  return response.data;
};

const login = async (userData) => {
  const response = await axiosClient.post(`/auth/login`, userData);
  if (response.data.token) {
    const token = response.data.token;
    Cookies.set("Tfy_access_token", token, {
      expires: 2,
      secure: true,
      sameSite: "Strict",
    });
  }
  return response.data;
};

const forgetPassword = async (userData) => {
  const response = await axiosClient.post(`/auth/forget-password`, userData);

  return response.data;
};

const resetPassword = async (userData) => {
  const { token, password, confirmPassword, email } = userData;
  const userInfo = { password, confirmPassword, email };
  const response = await axiosClient.post(
    `/auth/reset-password/${token}`,
    userInfo
  );

  return response.data;
};

const logout = async () => {
  const accessToken = Cookies.get("Tfy_access_token");
  if (accessToken) {
    Cookies.remove("Tfy_access_token");
    localStorage.removeItem("Tfy_tasks");
  }

  return { message: "Logout successful" };
};

const authService = {
  sign_up,
  login,
  logout,
  forgetPassword,
  resetPassword,
};

export default authService;
