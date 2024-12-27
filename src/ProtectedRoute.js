// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const tagId = localStorage.getItem("tag_id");
  const tagType = localStorage.getItem("tag_type");

  // If tag_id or tag_type does not exist, redirect to products page
  if (!tagId || !tagType) {
    return <Navigate to="/app/products" />;
  }

  return children; // Render the children if the condition is met
};

export default ProtectedRoute;