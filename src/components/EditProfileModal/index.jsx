// src/components/EditProfileModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css"; // Import your styles

const EditProfileModal = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: null,
    alternate_number: null,
    address: null,
    blood_group: null,
    existing_health_issues: null,
    existing_medication: null,
    primary_doctor: null,
    allergies: null,
    physically_disabled: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://192.168.1.31:8000/api/users/${userId}/`, {
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
      const response = await axios.put(`http://192.168.1.31:8000/api/users/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("User  updated:", response.data);
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
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="alternate_number">Alternate Number:</label>
            <input
              type="text"
              name="alternate_number"
              id="alternate_number"
              placeholder="Alternate Number"
              value={formData.alternate_number || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="blood_group">Blood Group:</label>
            <input
              type="text"
              name="blood_group"
              id="blood_group"
              placeholder="Blood Group"
              value={formData.blood_group || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="existing_health_issues">Existing Health Issues:</label>
            <input
              type="text"
              name="existing_health_issues"
              id="existing_health_issues"
              placeholder="Existing Health Issues"
              value={formData.existing_health_issues || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="existing_medication">Existing Medication:</label>
            <input
              type="text"
              name="existing_medication"
              id="existing_medication"
              placeholder="Existing Medication"
              value={formData.existing_medication || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="primary_doctor">Primary Doctor:</label>
            <input
              type="text"
              name="primary_doctor"
              id="primary_doctor"
              placeholder="Primary Doctor"
              value={formData.primary_doctor || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="allergies">Allergies:</label>
            <input
              type="text"
              name="allergies"
              id="allergies"
              placeholder="Allergies"
              value={formData.allergies || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.switch_container}>
            <label>
              Physically Disabled:
              <input
                type="checkbox"
                checked={formData.physically_disabled}
                onChange={() => setFormData({ ...formData, physically_disabled: !formData.physically_disabled })}
              />
            </label>
          </div>
          <button type="submit">Save Changes</button>
        </form>
        <button onClick={onClose} className={styles.close_button}>Close</button>
      </div>
    </div>
  );
};

export default EditProfileModal;