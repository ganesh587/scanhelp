import React, { useState } from "react";
import styles from "./styles.module.css";

const EditProfile = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    bio: "",
    phone: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Profile Updated:", data);
    // Redirect to products page after updating (you can use navigate from react-router)
    window.location = "/products";
  };

  return (
    <div className={styles.edit_profile_container}>
      <h1>Edit Profile</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h2>Profile Information</h2>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
          value={data.username}
          required
          className={styles.input}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />
        <textarea
          placeholder='Bio'
          name='bio'
          onChange={handleChange}
          value={data.bio}
          className={styles.textarea}
        />
        <input
          type='text'
          placeholder='Phone Number'
          name='phone'
          onChange={handleChange}
          value={data.phone}
          className={styles.input}
        />
        <div className={styles.button_container}>
          <button type='submit' className={styles.green_btn}>
            Update Profile
          </button>
          <button
            type='button'
            className={styles.cancel_btn}
            onClick={() => (window.location = "/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
