import React, { useState } from "react";
import styles from "./styles.module.css";

const CreateProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!data.name || !data.description || !data.price || !data.category) {
      setError("All fields are required.");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Product Created:", data);
    setSuccess(true); // Set success state
    // Optionally redirect or show success message
    setTimeout(() => {
      window.location = "/products"; // Redirect after 2 seconds
    }, 2000);
  };

  return (
    <div className={styles.create_product_container}>
      <h1>Create New Product</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label>
          Product Name
          <input
            type='text'
            name='name'
            value={data.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder='Enter product name'
          />
        </label>
        <label>
          Description
          <textarea
            name='description'
            value={data.description}
            onChange={handleChange}
            required
            className={styles.textarea}
            placeholder='Enter product description'
          />
        </label>
        <label>
          Price
          <input
            type='number'
            name='price'
            value={data.price}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder='Enter product price'
          />
        </label>
        <label>
          Category
          <select
            name='category'
            value={data.category}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value=''>Select a category</option>
            <option value='electronics'>Electronics</option>
            <option value='clothing'>Clothing</option>
            <option value='accessories'>Accessories</option>
            <option value='home'>Home</option>
          </select>
        </label>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Show error message */}
        {success && (
          <p className={styles.success}>Product created successfully!</p>
        )}{" "}
        {/* Show success message */}
        <button type='submit' className={styles.green_btn}>
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
