import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import config from '../../config';
import Spinner from "../Spinner";
import { Helmet } from 'react-helmet';

const EditProfileModal = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    alternate_number: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${config.API_URL}/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        setError("Error fetching user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${config.API_URL}/users/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onClose();
    } catch (error) {
      setError("Error updating user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      <div className={styles.modal_content}>
        <h2>Edit Profile</h2>
        {loading && <Spinner />}
        {error && <div className={styles.error_msg}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            { label: "Email", type: "email", name: "email" },
            { label: "Name", type: "text", name: "name" },
            { label: "Phone", type: "text", name: "phone" },
            { label: "Alternate Number", type: "text", name: "alternate_number" },
            { label: "Address", type: "text", name: "address" },
          ].map(({ label, type, name }) => (
            <div className={styles.form_group} key={name}>
              <label htmlFor={name} className={styles.label}>{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={formData[name]}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          ))}
          <div className={styles.button_group}>
            <button type="submit" className={styles.submit_button}>Save</button>
            <button type="button" onClick={onClose} className={styles.close_button}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
