// src/components/ScannedProduct.js
import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css"; // Import your styles

const ScannedProduct = () => {
  const location = useLocation();
  const { product, owner, vehicle, medical_details } = location.state; // Get product data from location state
const tag_type = localStorage.getItem("tag_type");
  return (
    <div className={styles.scanned_product_container}>
      <h1>Scanned Product Details</h1>
      {tag_type === "1" ? (
        <>
          <h2>Product: {product}</h2>
          <h3>Owner Information:</h3>
          <p>Email: {owner.email}</p>
          <p>Phone: {owner.phone || "N/A"}</p>
          <p>Alternate Number: {owner.alternate_number || "N/A"}</p>
          <p>Address: {owner.address || "N/A"}</p>
        </>
      ) : tag_type === "2" ? (
        <>
          <h2>Vehicle: {vehicle}</h2>
          <h3>Owner Information:</h3>
          <p>Email: {owner.email}</p>
          <p>Phone: {owner.phone || "N/A"}</p>
          <p>Alternate Number: {owner.alternate_number || "N/A"}</p>
          <p>Address: {owner.address || "N/A"}</p>
          <h3>Medical Details:</h3>
          <p>Emergency Contact: {medical_details.Emergency_Contact}</p>
          <p>Blood Group: {medical_details.blood_group}</p>
          <p>Existing Health Issues: {medical_details.existing_health_issues}</p>
          <p>Existing Medication: {medical_details.existing_medication}</p>
          <p>Primary Doctor: {medical_details.primary_doctor}</p>
          <p>Allergies: {medical_details.allergies}</p>
          <p>Physically Disabled: {medical_details.physically_disabled ? "Yes" : "No"}</p>
        </>
      ) : (
        <p>Unknown tag type.</p>
      )}
    </div>
  );
};

export default ScannedProduct;