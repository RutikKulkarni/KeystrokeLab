import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : element;
};

export default ProtectedRoute;
