// src/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    setModalOpen(true);
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isModalOpen, setModalOpen, handleSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};