import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";

const ScannedProduct = () => {
  const location = useLocation();

  if (location.state?.message === "Product display is off") {
    return (
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <h2>Product Unavailable</h2>
          <p className={styles.center_text}>
            The product display is currently off. Please try again later or
            contact support for assistance.
          </p>
        </div>
      </div>
    );
  }

  const { product_information, contact_information, reward_information } =
    location.state || {};
  const tag_type = product_information?.tag_type;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        {tag_type === "1" && (
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
              <tr>
                <td>Reward Amount</td>
                <td>{reward_information.reward_amount || "N/A"}</td>
              </tr>
              <tr>
                <td>Reward Note</td>
                <td>{reward_information.note || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ScannedProduct;
