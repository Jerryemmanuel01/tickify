import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const ProtectRoutes = ({element}) => {
  const token = Cookies.get("Tfy_access_token");
  if (!token) {
    return <Navigate to="/auth/login" replace/>;
  }
  return element;
};

export default ProtectRoutes;
