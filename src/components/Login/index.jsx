import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./styles.module.css";
import config from "../../config";
import Spinner from "../Spinner";
import { Helmet } from "react-helmet";
import Message from "../Message";
import QuestionModal from "../QuestionModal"; 

const Login = () => {
  const location = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setLoginData({ ...loginData, [input.name]: input.value });
  };

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
    }
    localStorage.removeItem("token");
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${config.API_URL}/token/`;
      const { data: res } = await axios.post(url, loginData);
      localStorage.setItem("token", res.access);

      const tagId = localStorage.getItem("tag_id");
      const tagType = localStorage.getItem("tag_type");

      if (tagId && tagType) {
        setShowModal(true); // Show modal instead of navigating directly
      } else {
        navigate("/app/products");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(
          error.response.data.detail || "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalChoice = (choice) => {
    setShowModal(false);
    if (choice === "yes") {
      navigate("/app/create-product");
    } else {
      localStorage.removeItem("tag_id");
      localStorage.removeItem("tag_type");
      navigate("/app/products");
    }
  };

  return (
    <div className={styles.login_container}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {loading && <Spinner />}
      {success && (
        <Message
          type="success"
          message={success}
          duration={5000}
          onClose={() => setSuccess("")}
        />
      )}
      {error && (
        <Message
          type="error"
          message={error}
          duration={5000}
          onClose={() => setError("")}
        />
      )}
      {showModal && (
        <QuestionModal
          title="Add Product"
          message="Do you want to add the product?"
          onConfirm={() => handleModalChoice("yes")}
          onCancel={() => handleModalChoice("no")}
        />
      )}
      <div className={styles.left}>
        <h1>ScanNHelp</h1>
      </div>
      <div className={styles.right}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <h1>Welcome Back!</h1>
          <p>Please log in to your account.</p>
          <div className={styles.input_container}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={loginData.email}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.input_container}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={loginData.password}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.green_btn}>
            Sign In
          </button>
          <p className={styles.register_text}>
            Don't have an account? <Link to="/app/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
