import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons
import styles from "./styles.module.css";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setLoginData({ ...loginData, [input.name]: input.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const url = "http://192.168.1.31:8000/api/token/"; // API endpoint
      const { data: res } = await axios.post(url, loginData); // Send POST request
      localStorage.setItem("token", res.access); // Store the token in local storage
      window.location = "/products"; // Redirect to the Products page after login
    } catch (error) {
      // Handle errors
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(
          error.response.data.detail || "Login failed. Please try again."
        );
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.left}>
        <h1>ScanNHelp</h1> {/* Showcase ScanNHelp on the left */}
      </div>
      <div className={styles.right}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <h1>Welcome Back!</h1>
          <p>Please log in to your account.</p>
          <div className={styles.input_container}>
            <FaEnvelope className={styles.icon} />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={loginData.email}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.input_container}>
            <FaLock className={styles.icon} />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={loginData.password}
              required
              className={styles.input}
            />
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          <button type='submit' className={styles.green_btn}>
            Sign In
          </button>
          <Link to='/forgot-password' className={styles.forgot_password}>
            Forgot Password?
          </Link>
          <p className={styles.register_text}>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
