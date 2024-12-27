import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);

  // If no user is authenticated, redirect to the login page
  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  // If the authenticated user is not an admin, redirect to a not-authorized page

  if (auth.user.role !== "ROLE_ADMIN") {
    return <Navigate to="/not-authorized" />;
  }

  // If the authenticated user is an admin, render the children (admin page)
  return children;
};

export default ProtectedRoute;
