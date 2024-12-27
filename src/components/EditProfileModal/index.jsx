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
    address: "",
    blood_group: "",
    existing_health_issues: "",
    existing_medication: "",
    primary_doctor: "",
    allergies: "",
    physically_disabled: false,
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
            <h2>Email</h2>
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
            <h2>Name</h2>
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
            <h2>Phone</h2>
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
            <h2>Alternate Number</h2>
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
            <h2>Address</h2>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h2>Blood Group</h2>
            <input
              type="text"
              name="blood_group"
              id="blood_group"
              placeholder="Enter your blood group"
              value={formData.blood_group}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h2>Existing Health Issues</h2>
 <input
              type="text"
              name="existing_health_issues"
              id="existing_health_issues"
              placeholder="Enter any existing health issues"
              value={formData.existing_health_issues}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h2>Existing Medication</h2>
            <input
              type="text"
              name="existing_medication"
              id="existing_medication"
              placeholder="Enter any existing medication"
              value={formData.existing_medication}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h2>Primary Doctor</h2>
            <input
              type="text"
              name="primary_doctor"
              id="primary_doctor"
              placeholder="Enter your primary doctor's name"
              value={formData.primary_doctor}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h2>Allergies</h2>
            <input
              type="text"
              name="allergies"
              id="allergies"
              placeholder="Enter any allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <h2>Physically Disabled</h2>
            <input
              type="checkbox"
              name="physically_disabled"
              id="physically_disabled"
              checked={formData.physically_disabled}
              onChange={(e) => setFormData({ ...formData, physically_disabled: e.target.checked })}
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