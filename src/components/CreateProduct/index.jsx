// src/components/CreateProduct.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css"; // Import your styles
import config from '../../config';
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    display: true, // Default value for display
    note: "",
    reward_amount: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle switch change for display
  const handleSwitchChange = () => {
    setFormData((prevData) => ({ ...prevData, display: !prevData.display }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token to get user_id
      const ownerId = decodedToken.user_id; // Extract user_id from the decoded token

      // Get tag_id and tag_type from local storage
      const tagId = localStorage.getItem("tag_id");
      const tagType = localStorage.getItem("tag_type");

      // Prepare the data for the POST request
      const data = {
        tag_id: tagId, // Include tag_id from local storage
        tag_type: tagType, // Include tag_type from local storage
        ...formData,
        owner: ownerId, // Set the owner to the user_id from the token
      };

      // Make the POST request
      const response = await axios.post(`${config.API_URL}/products/add/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Handle the response
      console.log("Product created:", response.data);
      
      // Clear local storage items
      localStorage.removeItem("tag_id");
      localStorage.removeItem("tag_type");

      // Redirect to the Products page
      navigate("/app/products");
    } catch (error) {
      // Handle errors
      if (error.response) {
        setError(error.response.data.detail || "Error creating product. Please try again.");
      } else {
        setError("Error creating product. Please try again.");
      }
    }
  };

  return (
    <div className={styles.create_product_container}>
      <h1>Create Product</h1>
      {error && <div className={styles.error_msg}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="reward_amount"
          placeholder="Reward Amount"
          value={formData.reward_amount}
          onChange={handleChange}
          required
        />
        <textarea
          name="note"
          placeholder="Notes about the product"
          value={formData.note}
          onChange={handleChange}
        />
        <div className={styles.switch_container}>
          <label>
            Display:
            <input
              type="checkbox"
              checked={formData.display}
              onChange={handleSwitchChange}
            />
          </label>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;