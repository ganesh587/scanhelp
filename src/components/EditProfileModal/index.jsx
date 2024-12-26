import React, { useState } from "react";
import styles from "./styles.module.css";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [profileData, setProfileData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !profileData.email ||
      !profileData.name ||
      !profileData.phone ||
      !profileData.address
    ) {
      setError("Email, Name, Phone Number, and Address are required.");
      return;
    }

    // Logic to update the profile
    console.log("Profile updated:", profileData);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <h2>Edit Profile</h2>
        {error && <p className={styles.error_msg}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={profileData.name}
            onChange={handleChange}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={profileData.email}
            onChange={handleChange}
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            value={profileData.phone}
            onChange={handleChange}
          />
          <input
            type='text'
            name='alternate_number'
            placeholder='Alternate Number'
            value={profileData.alternate_number}
            onChange={handleChange}
          />
          <textarea
            name='address'
            placeholder='Address'
            value={profileData.address}
            onChange={handleChange}
          />
          <input
            type='text'
            name='blood_group'
            placeholder='Blood Group'
            value={profileData.blood_group}
            onChange={handleChange}
          />
          <input
            type='text'
            name='existing_health_issues'
            placeholder='Existing Health Issues'
            value={profileData.existing_health_issues}
            onChange={handleChange}
          />
          <input
            type='text'
            name='existing_medication'
            placeholder='Existing Medication'
            value={profileData.existing_medication}
            onChange={handleChange}
          />
          <input
            type='text'
            name='primary_doctor'
            placeholder='Primary Doctor'
            value={profileData.primary_doctor}
            onChange={handleChange}
          />
          <input
            type='text'
            name='allergies'
            placeholder='Allergies'
            value={profileData.allergies}
            onChange={handleChange}
          />
          <label>
            Physically Disabled:
            <input
              type='checkbox'
              name='physically_disabled'
              checked={profileData.physically_disabled}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
