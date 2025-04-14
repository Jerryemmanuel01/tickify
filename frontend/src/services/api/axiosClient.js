import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple interceptor to add authorization header if token exists
axiosClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get("Tfy_access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Basic error handling interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("");
      try {
        const response = await axios.post("", {
          token: refreshToken,
        });
        const newAccessToken = response.data.data.accessToken;
        Cookies.set("", newAccessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
