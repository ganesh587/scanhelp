import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useAuth } from "../AuthContext";
import SessionExpiredModal from "../SessionExpiredModal";
import EditProfileModal from "../EditProfileModal";
import appconfig from '../../config';
import Spinner from "../Spinner";
import { Helmet } from 'react-helmet';
import ProductModal from "../Product";
import ErrorMessage from '../ErrorMessage'; 
import LogoutModal from '../LogoutModal'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const { isModalOpen, setModalOpen, handleSessionExpired } = useAuth(); 
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          handleSessionExpired(); 
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${appconfig.API_URL}/products/user/?user_id=${userId}`, config);
        setProducts(response.data); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleSessionExpired();
        } else {
          setError("Error fetching products. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        handleSessionExpired(); 
      }
    };

    const intervalId = setInterval(checkToken, 1000);
    return () => clearInterval(intervalId);
  }, [handleSessionExpired]);

  if (loading) return <Spinner />;

  const handleEditProfileClick = () => {
    setEditModalOpen(true); 
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); 
  };

  const handleLogoutClick = () => {
    console.log("test")
    setLogoutModalOpen(true);  // Open the logout modal
  };

  const handleLogoutConfirm = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Optionally redirect to login page or show a success message
    window.location.href = "/app/login";  // Redirect to login page or dashboard
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);  // Close the logout modal without logging out
  };

  return (
    <div className={styles.products_container}>
      {error && <ErrorMessage message={error} duration={5000} onClose={() => setError("")} />}
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isModalOpen && <SessionExpiredModal onClose={() => setModalOpen(false)} />}
      {isEditModalOpen && <EditProfileModal userId={jwtDecode(localStorage.getItem("token")).user_id} onClose={() => setEditModalOpen(false)} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {isLogoutModalOpen && <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel}/>}
      <div className={styles.header}>
        <div className={styles.header_content}>
          <FaUser className={styles.profile_icon} size={30} onClick={handleEditProfileClick} />
          <h1 className={styles.title}>ScanNHelp</h1>
          <FaSignOutAlt className={styles.logout_icon} size={30} onClick={handleLogoutClick}/>
        </div>
      
      </div>

      <div className={styles.cards_container}>
        {products.map((product) => (
          <div key={product.id} className={styles.card} onClick={() => handleProductClick(product)}>
            <h2>{product.product_name}</h2> 
            <p>{product.description}</p> 
            <button className={styles.view_product_btn}>
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
