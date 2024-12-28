// src/components/EditProfileModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css"; // Import your styles
import config from '../../config';

const EditProfileModal = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    alternate_number: "",
    address: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${config.API_URL}/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data); // Set the form data with the fetched user details
      } catch (error) {
        setError("Error fetching user details. Please try again.");
      }
    };

    fetchUserDetails(); // Fetch user details when the modal opens
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${config.API_URL}/users/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onClose(); // Close the modal after successful update
    } catch (error) {
      setError("Error updating user details. Please try again.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2>Edit Profile</h2>
        {error && <div className={styles.error_msg}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_group}>
            <h3>Email</h3>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <h3>Phone</h3>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h3>Alternate Number</h3>
            <input
              type="text"
              name="alternate_number"
              id="alternate_number"
              placeholder="Enter alternate number"
              value={formData.alternate_number}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h3>Address</h3>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        
          <button type="submit" className={styles.submit_button}>Update Profile</button>
        </form>
        <button onClick={onClose} className={styles.close_button}>Close</button>
      </div>
    </div>
  );
};

export default EditProfileModal;