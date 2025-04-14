import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectAuths = ({element}) => {
  const token = Cookies.get("Tfy_access_token");
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return element;
};

export default ProtectAuths;
