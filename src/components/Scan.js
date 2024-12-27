// src/components/Scan.js
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const Scan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalOpen } = useAuth(); // Use the auth context to manage modal state

  // Extract tag_id and tag_type from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const tagId = queryParams.get("tag_id");
  const tagType = queryParams.get("tag_type");

  useEffect(() => {
    const scanProduct = async () => {
      // Check if the user is already logged in
      const token = localStorage.getItem("token");
      if (token) {
        // If logged in, redirect to create-product page with tag_id and tag_type
        localStorage.setItem("tag_id", tagId);
        localStorage.setItem("tag_type", tagType);
        navigate("/create-product");
        return; // Exit early since we are redirecting
      }

      try {
        const response = await axios.post("http://192.168.1.31:8000/api/scan", {
          tag_id: tagId,
          tag_type: tagType,
        });

        // Check for error in response
        if (response.data.error) {
          localStorage.setItem("tag_id", tagId);
          localStorage.setItem("tag_type", tagType);
          // Redirect to login if product not found
          navigate("/login");
        } else {
          // If product found, redirect to ScannedProduct page with product data
          navigate("/scanned-product", { state: response.data });
        }
      } catch (error) {
        console.error("Error during scan:", error);
        // Handle error (e.g., show a modal or message)
        setModalOpen(true); // Optionally show a modal for error
      }
    };

    scanProduct(); // Call the scan function
  }, [navigate, tagId, tagType, setModalOpen]); // Dependencies for useEffect

  return <div>Loading...</div>; // Show loading state while scanning
};

export default Scan;