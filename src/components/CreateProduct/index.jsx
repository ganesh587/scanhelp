// src/components/CreateProduct.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css"; // Import your styles
import config from '../../config';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    display: true, // Default value for display
    contact_name: "",
    contact_phone: "",
    contact_alternate_number: "",
    contact_address: "",
    note: "",
    reward_amount: "",
    tag_type: 1, // Default tag_type
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

      // Prepare the data for the POST request
      const data = {
        tag_id: localStorage.getItem("tag_id"), // Include tag_id from local storage
        tag_type: localStorage.getItem("tag_type"), // Use the selected tag_type
        product_name: formData.product_name,
        description: formData.description,
        display: formData.display,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        contact_alternate_number: formData.contact_alternate_number || null,
        contact_address: formData.contact_address || null,
        note: formData.tag_type === 1 ? formData.note : null, // Include note only for tag_type 1
        reward_amount: formData.tag_type === 1 ? formData.reward_amount : null, // Include reward_amount only for tag_type 1
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
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
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
        
        {/* Conditional rendering for reward_amount and note based on tag_type */}
        {formData.tag_type === 1 && (
          <>
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
              placeholder="Note"
              value={formData.note}
              onChange={handleChange}
            />
          </>
        )}

        <div className={styles.switch_container}>
          <label>
            Display:
            <input
              type ="checkbox"
              checked={formData.display}
              onChange={handleSwitchChange}
            />
          </label>
        </div>

        {/* Common fields for both tag types */}
        <input
          type="text"
          name="contact_name"
          placeholder="Contact Name"
          value={formData.contact_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact_phone"
          placeholder="Contact Phone"
          value={formData.contact_phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact_alternate_number"
          placeholder="Contact Alternate Number"
          value={formData.contact_alternate_number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact_address"
          placeholder="Contact Address"
          value={formData.contact_address}
          onChange={handleChange}
        />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;