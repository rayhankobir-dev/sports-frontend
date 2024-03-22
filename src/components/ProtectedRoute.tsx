/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { auth }: any = useAuth();
  return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
