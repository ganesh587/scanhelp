import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FaUser, FaPlus } from "react-icons/fa";
import EditProfileModal from "../EditProfileModal"; // Import the EditProfileModal component

const Products = () => {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isCreateProductOpen, setCreateProductOpen] = useState(false);

  // Dummy data for products
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality sound with noise cancellation.",
      price: "$99",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected.",
      price: "$199",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable speaker with deep bass.",
      price: "$49",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      description: "Ergonomic design with customizable buttons.",
      price: "$59",
    },
    {
      id: 5,
      name: "4K Monitor",
      description: "Stunning visuals with ultra HD resolution.",
      price: "$299",
    },
    {
      id: 6,
      name: "Laptop Stand",
      description: "Adjustable height for better ergonomics.",
      price: "$29",
    },
  ];

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    // Logic to update the profile
    setEditProfileOpen(false); // Close the modal after submission
  };

  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    // Logic to create a new product
    setCreateProductOpen(false); // Close the modal after submission
  };

  return (
    <div className={styles.products_container}>
      <div className={styles.header}>
        <button
          onClick={() => setEditProfileOpen(true)}
          className={styles.profile_icon}
        >
          <FaUser size={30} />
        </button>
        <button
          onClick={() => setCreateProductOpen(true)}
          className={styles.create_button}
        >
          <FaPlus size={30} />
        </button>
      </div>
      <h1>ScanNHelp</h1>
      <div className={styles.cards_container}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className={styles.price}>{product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className={styles.view_product_btn}
            >
              View Product
            </Link>
          </div>
        ))}
      </div>

      {/* Modal for Edit Profile */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />

      {/* Modal for Create Product */}
      {/* You can keep the existing modal for creating products if needed */}
    </div>
  );
};

export default Products;
