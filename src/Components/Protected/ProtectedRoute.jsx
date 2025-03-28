import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token"); 
  const role = sessionStorage.getItem("role"); 
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
