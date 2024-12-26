import React, { useState } from "react";
import styles from "./styles.module.css";

const CreateProductModal = ({ isOpen, onClose }) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to create a new product
    console.log("Product created:", productData);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Product Name'
            value={productData.name}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={productData.description}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            name='price'
            placeholder='Price'
            value={productData.price}
            onChange={handleChange}
            required
          />
          <button type='submit'>Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
