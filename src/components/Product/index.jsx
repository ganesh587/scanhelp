// src/components/Product/index.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import appconfig from '../../config';
import styles from "./styles.module.css"; // Import your styles

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  // Define userId and token here
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token to get user_id
  const userId = decodedToken.user_id; // Extract user_id from token

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${appconfig.API_URL}/products/${id}/?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });
        setProduct(response.data);
        setFormData(response.data); // Set form data with fetched product details
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct(); // Fetch product details on component mount
  }, [id, userId, token]); // Add userId and token to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${appconfig.API_URL}/products/${id}/`, {
        ...formData,
        tag_id: product.tag_id, // Include tag_id from existing product details
        tag_type: product.tag_type, // Include tag_type from existing product details
        owner: product.owner, // Include owner from existing product details
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the headers
          "Content-Type": "application/json",
        },
      });
      setIsEditing(false); // Exit editing mode after successful update
      // Optionally, fetch the updated product details again
      const response = await axios.get(`${appconfig.API_URL}/products/${id}/?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the headers
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.product_container}>
      <h1>{isEditing ? "Edit Product" : "Product Details"}</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="reward_amount"
            value={formData.reward_amount}
            onChange={handleChange}
            required
          />
          <div>
            <label>
              Display:
              <input
                type="checkbox"
                checked={formData.display}
                onChange={() => setFormData({ ...formData, display: !formData.display })}
              />
            </label>
          </div>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Note"
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button> {/* Cancel button to exit edit mode */}
        </form>
      ) : (
        <div>
          <h2>Name: {product.name}</h2>
          <p>Description: {product.description}</p>
          <p>Reward Amount: {product.reward_amount}</p>
          <p>Display: {product.display ? "On" : "Off"}</p> {/* Display status */}
          <p>Note: {product.note}</p> {/* Note field */}
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Product;