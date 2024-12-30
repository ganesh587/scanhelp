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

  const { product_information, contact_information, reward_information } =
    location.state || {};
  const tag_type = product_information?.tag_type;

  return (
    <div className={styles.modal}>
        <Helmet>
        <title>Scanned Product</title>
      </Helmet>
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
