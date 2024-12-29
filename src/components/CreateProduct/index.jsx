import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import config from '../../config';
import { Helmet } from 'react-helmet';
import Spinner from "../Spinner";
import Message from '../Message'; 

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    display: true,
    contact_name: "",
    contact_phone: "",
    contact_alternate_number: "",
    contact_address: "",
    note: "",
    reward_amount: "",
    tag_type: 1, // Default tag_type
    emergency_contact: "",
    blood_group: "",
    existing_health_issues: "",
    existing_medication: "",
    primary_doctor: "",
    allergies: "",
    physically_disabled: false,
  });
  const [loading, setLoading] = useState(false);
  const tag_type = localStorage.getItem("tag_type");
  const tag_id = localStorage.getItem("tag_id");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const ownerId = decodedToken.user_id;

    const data = {
      tag_id: tag_id,
      tag_type: tag_type,
      product_name: formData.product_name,
      description: formData.description,
      display: formData.display,
      contact_name: formData.contact_name,
      contact_phone: formData.contact_phone,
      contact_alternate_number: formData.contact_alternate_number || null,
      contact_address: formData.contact_address || null,
      note: tag_type === "1" ? formData.note : null,
      reward_amount: tag_type === "1" ? formData.reward_amount : null,
      owner: ownerId,
      emergency_contact: tag_type === "2" ? formData.emergency_contact : null,
      blood_group: tag_type === "2" ? formData.blood_group : null,
      existing_health_issues: tag_type === "2" ? formData.existing_health_issues : null,
      existing_medication: tag_type === "2" ? formData.existing_medication : null,
      primary_doctor: tag_type === "2" ? formData.primary_doctor : null,
      allergies: tag_type === "2" ? formData.allergies : null,
      physically_disabled: tag_type === "2" ? formData.physically_disabled : false,
    };

    try {
      setLoading(true);
      await axios.post(`${config.API_URL}/products/a/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("tag_id");
      localStorage.removeItem("tag_type");
      setLoading(false);
      navigate("/app/products");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data.detail || "Error creating product. Please try again.");
    }
  };

  return (
    <> {error && <Message type="error" message={error} duration={5000} onClose={() => setError("")} />}
    <div className={styles.create_product_container}>
          <Helmet>
        <title>Create Product</title>
      </Helmet>
      {error && <div className={styles.error_msg}>{error}</div>}
      {loading && <Spinner />}
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="product_name">Product Name</label>
          <input type="text" id="product_name" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} required />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="description">Product Description</label>
          <textarea id="description" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} />
        </div>

        {tag_type === "1" && (
          <>
            <div className={styles.form_group}>
              <label htmlFor="reward_amount">Reward Amount</label>
              <input type="number" id="reward_amount" name="reward_amount" placeholder="Reward Amount" value={formData.reward_amount} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="note">Note</label>
              <textarea id="note" name="note" placeholder="Note" value={formData.note} onChange={handleChange} />
            </div>
          </>
        )}

        {tag_type === "2" && (
          <>
            <div className={styles.form_group}>
              <label htmlFor="emergency_contact">Emergency Contact</label>
              <input type="text" id="emergency_contact" name="emergency_contact" placeholder="Emergency Contact" value={formData.emergency_contact} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="blood_group">Blood Group</label>
              <input type="text" id="blood_group" name="blood_group" placeholder="Blood Group" value={formData.blood_group} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="existing_health_issues">Existing Health Issues</label>
              <input type="text" id="existing_health_issues" name="existing_health_issues" placeholder="Existing Health Issues" value={formData.existing_health_issues} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="existing_medication">Existing Medication</label>
              <input type="text" id="existing_medication" name="existing_medication" placeholder="Existing Medication" value={formData.existing_medication} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="primary_doctor">Primary Doctor</label>
              <input type="text" id="primary_doctor" name="primary_doctor" placeholder="Primary Doctor" value={formData.primary_doctor} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="allergies">Allergies</label>
              <input type="text" id="allergies" name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
            </div>
            <div className={styles.switch_container}>
              <label>
                Physically Disabled
                <input type="checkbox" checked={formData.physically_disabled} onChange={() => setFormData(prevData => ({ ...prevData, physically_disabled: !prevData.physically_disabled }))} />
              </label>
            </div>
          </>
        )}

        <div className={styles.form_group}>
          <label htmlFor="contact_name">Contact Name</label>
          <input type="text" id="contact_name" name="contact_name" placeholder="Contact Name" value={formData.contact_name} onChange={handleChange} />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="contact_phone">Contact Phone</label>
          <input type="text" id="contact_phone" name="contact_phone" placeholder="Contact Phone" value={formData.contact_phone} onChange={handleChange} />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="contact_alternate_number">Contact Alternate Number</label>
          <input type="text" id="contact_alternate_number" name="contact_alternate_number" placeholder="Contact Alternate Number" value={formData.contact_alternate_number} onChange={handleChange} />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="contact_address">Contact Address</label>
          <input type="text" id="contact_address" name="contact_address" placeholder="Contact Address" value={formData.contact_address} onChange={handleChange} />
        </div>

        <div className={styles.switch_container}>
          <label>
            Display
            <input type="checkbox" checked={formData.display} onChange={() => setFormData(prevData => ({ ...prevData, display: !prevData.display }))} />
          </label>
        </div>
        
        <button type="submit">Create Product</button>
      </form>
    </div>
    </>
  );
};

export default CreateProduct;
