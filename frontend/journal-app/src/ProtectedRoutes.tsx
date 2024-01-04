// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "./queries";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useLogin();

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
