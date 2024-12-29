import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const tagId = localStorage.getItem("tag_id");
  const tagType = localStorage.getItem("tag_type");

  if (!tagId || !tagType) {
    return <Navigate to="/app/products" />;
  }

  return children; 
};

export default ProtectedRoute;