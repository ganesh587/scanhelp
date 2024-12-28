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
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          
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
            value={formData.contact_alternate_number || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact_address"
            placeholder="Contact Address"
            value={formData.contact_address || ""}
            onChange={handleChange}
          />

          {/* Conditional rendering for tag_type */}
          {product.tag_type === 1 && (
            <>
              <input
                type="number"
 name="reward_amount"
                value={formData.reward_amount}
                onChange={handleChange}
                required
              />
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Note"
                required
              />
            </>
          )}
          
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
          
          {/* Conditional fields based on tag_type */}
          {product.tag_type === 2 && (
            <>
              <input
                type="text"
                name="Emergency_Contact"
                placeholder="Emergency Contact"
                value={formData.Emergency_Contact || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="blood_group"
                placeholder="Blood Group"
                value={formData.blood_group || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="existing_health_issues"
                placeholder="Existing Health Issues"
                value={formData.existing_health_issues || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="existing_medication"
                placeholder="Existing Medication"
                value={formData.existing_medication || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="primary_doctor"
                placeholder="Primary Doctor"
                value={formData.primary_doctor || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="allergies"
                placeholder="Allergies"
                value={formData.allergies || ""}
                onChange={handleChange}
              />
              <div>
                <label>
                  Physically Disabled:
                  <input
                    type="checkbox"
                    checked={formData.physically_disabled || false}
                    onChange={() => setFormData({ ...formData, physically_disabled: !formData.physically_disabled })}
                  />
                </label>
              </div>
            </>
          )}

          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button> {/* Cancel button to exit edit mode */}
        </form>
      ) : (
        <div>
          <h2>Name: {product.product_name}</h2>
          <p>Description: {product.description}</p>
          <p>Contact Name: {product.contact_name}</p>
          <p>Contact Phone: {product.contact_phone}</p>
          <p>Contact Alternate Number: {product.contact_alternate_number}</p>
          <p>Contact Address: {product.contact_address}</p>
          {product.tag_type === 1 && (
            <>
              <p>Reward Amount: {product.reward_amount}</p>
              <p>Note: {product.note}</p>
            </>
          )}
          <p>Display: {product.display ? "On" : "Off"}</p> {/* Display status */}
          {product.tag_type === 2 && (
            <>
              <p>Emergency Contact: {product.Emergency_Contact}</p>
              <p>Blood Group: {product.blood_group}</p>
              <p>Existing Health Issues: {product.existing_health_issues}</p>
              <p>Existing Medication: {product.existing_medication}</p>
              <p>Primary Doctor: {product.primary_doctor}</p>
              <p>Allergies: {product.allergies}</p>
              <p>Physically Disabled: {product.physically_disabled ? "Yes" : "No"}</p>
            </>
          )}
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Product;