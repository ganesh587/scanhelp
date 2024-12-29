import React, { useState, useEffect } from "react";
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
    display: false,
    contact_name: "",
    contact_phone: "",
    contact_alternate_number: "", 
    contact_address: "",
    tag_type: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const tag_type = localStorage.getItem("tag_type");
  const tag_id = localStorage.getItem("tag_id");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.user_id;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.API_URL}/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, phone, alternate_number, address } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          contact_name: name || "",
          contact_phone: phone || "",
          contact_alternate_number: alternate_number || "",
          contact_address: address || "",
        }));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Error fetching user data. Please try again.");
      }
    };

    fetchUserData();
  }, []); 

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
      owner: ownerId
    };
  
    try {
      setLoading(true);
      await axios.post(`${config.API_URL}/products/add/`, data, {
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
  
      if (err.response?.data?.tag_id?.[0] === "product with this tag id already exists.") {
        setError("A product with this tag ID already exists. Please use a different tag ID.");
      } else {
        setError(err.response?.data.detail || "Error creating product. Please try again.");
      }
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.create_product_container}>
      {error && <Message type="error" message={error} duration={5000} onClose={() => setError("")} />}
        <Helmet>
          <title>Create Product</title>
        </Helmet>
        {loading && <Spinner />}
        <h1>Register ScanNHelp Tag</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <h2>Product Information</h2>
            <div className={styles.form_group}>
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                placeholder="Product Name"
                value={formData.product_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.card}>
            <h2>Contact Information</h2>
            <div className={styles.form_group}>
              <label htmlFor="contact_name">Contact Name</label>
              <input
                type="text"
                id="contact_name"
                name="contact_name"
                placeholder="Contact Name"
                value={formData.contact_name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="contact_phone">Contact Phone</label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                placeholder="Contact Phone"
                value={formData.contact_phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="contact_alternate_number">Contact Alternate Number</label>
              <input
                type="text"
                id="contact_alternate_number"
                name="contact_alternate_number"
                placeholder="Contact Alternate Number"
                value={formData.contact_alternate_number}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="contact_address">Contact Address</label>
              <input
                type="text"
                id="contact_address"
                name="contact_address"
                placeholder="Contact Address"
                value={formData.contact_address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.switch_container}>
            <label>
              {tag_type === 1 ? 'Mark as Lost':'Display Health Info '}
              <input
                type="checkbox"
                checked={formData.display}
                onChange={() => setFormData((prevData) => ({ ...prevData, display: !prevData.display }))}
              />
            </label>
          </div>

          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
