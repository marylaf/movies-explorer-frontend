import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, element: Component, ...props }) => {
  if (!isLoggedIn) {
    return  <Navigate to="/sign-in" replace />
  }

  return children;
};

export default ProtectedRoute;
