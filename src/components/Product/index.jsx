import React, { useState, useEffect } from "react";
import axios from "axios";
import appconfig from '../../config';
import styles from "./styles.module.css";
import { Helmet } from 'react-helmet';
import Spinner from "../Spinner";
import ErrorMessage from '../ErrorMessage'; 
const Product = ({ product, onClose }) => {
  const [formData, setFormData] = useState({ ...product });
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  if (isLoading) return <Spinner />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(
        `${appconfig.API_URL}/products/${product.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      onClose(); 
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again.");
      setIsLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className={styles.modal}>
        {error && <ErrorMessage message={error} duration={5000} onClose={() => setError("")} />}
       <Helmet>
        <title>Edit Product</title> 
      </Helmet>
      <div className={styles.modal_content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Edit Product</h2>
          <div className={styles.form_group}>
            <label htmlFor="product_name">Product Name</label>
            <input
              id="product_name"
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="contact_name">Contact Name</label>
            <input
              id="contact_name"
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="contact_phone">Contact Phone</label>
            <input
              id="contact_phone"
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="contact_alternate_number">Contact Alternate Number</label>
            <input
              id="contact_alternate_number"
              type="text"
              name="contact_alternate_number"
              value={formData.contact_alternate_number || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="contact_address">Contact Address</label>
            <input
              id="contact_address"
              type="text"
              name="contact_address"
              value={formData.contact_address || ""}
              onChange={handleChange}
            />
          </div>

          {product.tag_type === 1 && (
            <>
              <div className={styles.form_group}>
                <label htmlFor="reward_amount">Reward Amount</label>
                <input
                  id="reward_amount"
                  type="number"
                  name="reward_amount"
                  value={formData.reward_amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="note">Note</label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {product.tag_type === 2 && (
            <>
              <div className={styles.form_group}>
                <label htmlFor="Emergency_Contact">Emergency Contact</label>
                <input
                  id="Emergency_Contact"
                  type="text"
                  name="Emergency_Contact"
                  value={formData.Emergency_Contact || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="blood_group">Blood Group</label>
                <input
                  id="blood_group"
                  type="text"
                  name="blood_group"
                  value={formData.blood_group || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="existing_health_issues">Existing Health Issues</label>
                <input
                  id="existing_health_issues"
                  type="text"
                  name="existing_health_issues"
                  value={formData.existing_health_issues || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="existing_medication">Existing Medication</label>
                <input
                  id="existing_medication"
                  type="text"
                  name="existing_medication"
                  value={formData.existing_medication || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="primary_doctor">Primary Doctor</label>
                <input
                  id="primary_doctor"
                  type="text"
                  name="primary_doctor"
                  value={formData.primary_doctor || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="allergies">Allergies</label>
                <input
                  id="allergies"
                  type="text"
                  name="allergies"
                  value={formData.allergies || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.checkbox_group}>
                <label htmlFor="physically_disabled">
                  Physically Disabled
                  <input
                    id="physically_disabled"
                    type="checkbox"
                    checked={formData.physically_disabled || false}
                    onChange={() => setFormData({ ...formData, physically_disabled: !formData.physically_disabled })}
                  />
                </label>
              </div>
            </>
          )}

          <div className={styles.checkbox_group}>
            <label htmlFor="display">
              Display
              <input
                id="display"
                type="checkbox"
                checked={formData.display}
                onChange={() => setFormData({ ...formData, display: !formData.display })}
              />
            </label>
          </div>

          <div className={styles.button_group}>
            <button type="submit" className={styles.submit_button} disabled={isLoading}>
              Save
            </button>
            <button type="button" className={styles.close_button} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
