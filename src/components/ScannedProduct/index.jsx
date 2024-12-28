// src/components/ScannedProduct.js
import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css"; // Import your styles

const ScannedProduct = () => {
  const location = useLocation();
  const { product_information, contact_information, reward_information, medical_details } = location.state; // Get product data from location state
  const tag_type = localStorage.getItem("tag_type");

  return (
    <div className={styles.scanned_product_container}>
      <h1>Scanned Product Details</h1>
      {tag_type === "1" ? (
        <>
          <h2>Product: {product_information.product_name}</h2>
          <h3>Description: {product_information.description}</h3>
          <h3>Owner Information:</h3>
          <p>Name: {contact_information.name || "N/A"}</p>
          <p>Phone: {contact_information.phone_number || "N/A"}</p>
          <p>Alternate Number: {contact_information.alternate_number || "N/A"}</p>
          <p>Address: {contact_information.address || "N/A"}</p>
          <h3>Reward Information:</h3>
          <p>Reward Amount: {reward_information.reward_amount || "N/A"}</p>
          <p>Note: {reward_information.note || "N/A"}</p>
        </>
      ) : tag_type === "2" ? (
        <>
          <h2>Vehicle: {product_information.product_name}</h2>
          <h3>Description: {product_information.description}</h3>
          <h3>Owner: {product_information.owner || "N/A"}</h3>
          <h3>Contact Information:</h3>
          <p>Name: {contact_information.name || "N/A"}</p>
          <p>Phone: {contact_information.phone_number || "N/A"}</p>
          <p>Alternate Number: {contact_information.alternate_number || "N/A"}</p>
          <p>Address: {contact_information.address || "N/A"}</p>
          <h3>Medical Details:</h3>
          <p>Emergency Contact: {medical_details.emergency_contact || "N/A"}</p>
          <p>Blood Group: {medical_details.blood_group || "N/A"}</p>
          <p>Existing Health Issues: {medical_details.existing_health_issues || "N/A"}</p>
          <p>Existing Medication: {medical_details.existing_medication || "N/A"}</p>
          <p>Primary Doctor: {medical_details.primary_doctor || "N/A"}</p>
          <p>Allergies: {medical_details.allergies || "N/A"}</p>
          <p>Physically Disabled: {medical_details.physically_disabled ? "Yes" : "No"}</p>
        </>
      ) : (
        <p>Unknown tag type.</p>
      )}
    </div>
  );
};

export default ScannedProduct;