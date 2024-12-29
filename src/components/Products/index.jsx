import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { FaUser, FaSignOutAlt, FaTrash } from "react-icons/fa"; // Add FaTrash for delete icon
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useAuth } from "../AuthContext";
import SessionExpiredModal from "../SessionExpiredModal";
import EditProfileModal from "../EditProfileModal";
import appconfig from '../../config';
import Spinner from "../Spinner";
import { Helmet } from 'react-helmet';
import ProductModal from "../Product";
import Message from '../Message'; 
import LogoutModal from '../LogoutModal'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message
  const { isModalOpen, setModalOpen, handleSessionExpired } = useAuth();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products function
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

  useEffect(() => {
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

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleSessionExpired();
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      await axios.delete(`${appconfig.API_URL}/products/${productId}`, config);
      setLoading(false);
      setSuccessMessage("Product deleted successfully!");
      
      // Re-fetch products after deletion
      fetchProducts();
    } catch (error) {
      setLoading(false);
      setError("Error deleting product. Please try again later.");
    }
  };

  const handleEditProfileClick = () => {
    setEditModalOpen(true);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    window.location.href = "/app/login";
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div className={styles.products_container}>
      {error && <Message type="error" message={error} duration={5000} onClose={() => setError("")} />}
      {loading && <Spinner />}
      {successMessage && (
        <Message type="success" message={successMessage} duration={5000} onClose={() => setSuccessMessage("")} />
      )}
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isModalOpen && <SessionExpiredModal onClose={() => setModalOpen(false)} />}
      {isEditModalOpen && <EditProfileModal userId={jwtDecode(localStorage.getItem("token")).user_id} onClose={() => setEditModalOpen(false)} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {isLogoutModalOpen && <LogoutModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />}

      <div className={styles.header}>
        <div className={styles.header_content}>
          <FaUser className={styles.profile_icon} size={30} onClick={handleEditProfileClick} />
          <h1 className={styles.title}>ScanNHelp</h1>
          <FaSignOutAlt  title="Logout"  className={styles.logout_icon} size={30} onClick={handleLogoutClick} />
        </div>
      </div>

      <div className={styles.cards_container}>
        {(products.length === 0 && !loading) ? (
          <div className={styles.no_products_message}>
            <h2>No products available</h2>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.card}>
              <h2>{product.product_name}</h2>
              <p>{product.description}</p>
              <div className={styles.card_actions}>
                <button className={styles.view_product_btn} onClick={() => setSelectedProduct(product)}>
                  View Product
                </button>
                <FaTrash 
                  className={styles.delete_icon} 
                  size={20} 
                  onClick={() => handleDeleteProduct(product.id)} 
                  title="Delete Product" 
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
