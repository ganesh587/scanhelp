// src/components/Products/index.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FaUser  } from "react-icons/fa";
import { jwtDecode } from "jwt-decode"; // Correct named import
import axios from "axios"; // Import axios
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import SessionExpiredModal from "../SessionExpiredModal"; // Import the modal
import EditProfileModal from "../EditProfileModal"; // Import the EditProfileModal
import appconfig from '../../config';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isModalOpen, setModalOpen, handleSessionExpired } = useAuth(); // Use the auth context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          handleSessionExpired(); // Handle case where token is not present
          return;
        }

        const decodedToken = jwtDecode(token); // Decode the token to get user_id
        const userId = decodedToken.user_id; // Extract user_id from token

        // Set up the headers with the Authorization token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        };

        // Make the API call with the headers
        const response = await axios.get(`${appconfig.API_URL}/products/user/?user_id=${userId}`, config);
        setProducts(response.data); // Set the products state with the fetched data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If the token is expired or invalid
          handleSessionExpired(); // Call the session expired handler
        } else {
          setError("Error fetching products. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Call the fetch function
  }, [handleSessionExpired]); // Include handleSessionExpired in the dependency array

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const handleEditProfileClick = () => {
    setEditModalOpen(true); // Open the edit profile modal
  };

  return (
    <div className={styles.products_container}>
      {isModalOpen && <SessionExpiredModal onClose={() => setModalOpen(false)} />}
      {isEditModalOpen && <EditProfileModal userId={jwtDecode(localStorage.getItem("token")).user_id} onClose={() => setEditModalOpen(false)} />}
      <div className={styles.header}>
        <button className={styles.profile_icon} onClick={handleEditProfileClick}>
          <FaUser  size={30} />
        </button>
      </div>
      <h1>ScanNHelp</h1>
      <div className={styles.cards_container}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className={styles.price}>Reward Amount: {product.reward_amount}</p>
            <p>Note: {product.note}</p>
            <Link to={`/product/${product.id}`} className ={styles.view_product_btn}>
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;