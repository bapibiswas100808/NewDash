import { Navigate, Outlet } from "react-router-dom";

const PrivateAuth = () => {
  const auth = localStorage.getItem("getToken");
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateAuth;
