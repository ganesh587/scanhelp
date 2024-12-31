import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { Helmet } from "react-helmet";
import displayOffImage from '../../displayoff.jpg';
const ScannedProduct = () => {
  const location = useLocation();

  if (location.state?.message === "product display is off") {
    return (
      <div className={styles.modal}>
          <Helmet>
        <title>Scanned Product</title>
      </Helmet>
      <div>
  <img
src={displayOffImage}
    alt="Product unavailable"
    className={styles.unavailable_image}
  />
</div>

      </div>
    );
  }

  const { product_information, contact_information, reward_information,medical_details } =
    location.state || {};
  const tag_type = product_information?.tag_type;

  return (
    <div className={styles.modal}>
        <Helmet>
        <title>Scanned Product</title>
      </Helmet>
      <div className={styles.modal_content}>
      
          <table className={styles.details_table}>
            <tbody>
              <tr>
                <td>Product Name</td>
                <td>{product_information.product_name || "N/A"}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{product_information.description || "N/A"}</td>
              </tr>
              <tr>
                <td>Owner Name</td>
                <td>{contact_information.name || "N/A"}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{contact_information.phone_number || "N/A"}</td>
              </tr>
              <tr>
                <td>Alternate Number</td>
                <td>{contact_information.alternate_number || "N/A"}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{contact_information.address || "N/A"}</td>
              </tr>
              {tag_type === "2" && (
                <>
                 <tr>
                <td>Emergency Contact</td>
                <td>{medical_details.emergency_contact || "N/A"}</td>
              </tr>   
              <tr>
                <td>Blood Group</td>
                <td>{medical_details.blood_group || "N/A"}</td>
              </tr>
              <tr>
                <td>Existing health issues</td>
                <td>{medical_details.existing_health_issues || "N/A"}</td>
              </tr>
              <tr>
                <td>Existing Medication</td>
                <td>{medical_details.existing_medication || "N/A"}</td>
              </tr>
              <tr>
                <td>Primary doctor</td>
                <td>{medical_details.primary_doctor || "N/A"}</td>
              </tr>
              <tr>
                <td>Allergies</td>
                <td>{medical_details.allergies || "N/A"}</td>
              </tr>
              <tr>
                <td>Physically disabled</td>
                <td>{medical_details.physically_disabled ? "Yes" : "No" }</td>
              </tr>
              </>
               )}
              {tag_type === "1" && (
                <>
              <tr>
                <td>Reward Amount</td>
                <td>{reward_information.reward_amount || "N/A"}</td>
              </tr>
              <tr>
                <td>Reward Note</td>
                <td>{reward_information.note || "N/A"}</td>
              </tr>
              </>
               )}
            </tbody>
          </table>
       
      </div>
    </div>
  );
};

export default ScannedProduct;
