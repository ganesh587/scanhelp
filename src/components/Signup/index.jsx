import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import ErrorMessage from '../ErrorMessage'; 
import Spinner from "../Spinner";
import { Helmet } from 'react-helmet';
import config from '../../config';
const Signup = () => {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${config.API_URL}/signup/`;
      const response = await axios.post(url, {
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
        address: data.address,
      });
      setLoading(false);
      navigate("/app/login");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
      }
    }
  };
  if (loading) return <Spinner />;
  return (
    <div className={styles.signup_container}>
          <Helmet>
        <title>Register</title> 
      </Helmet>
      {error && <ErrorMessage message={error} duration={5000} onClose={() => setError("")} />}
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/app/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              value={data.phone}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={data.address}
              className={styles.input}
            />
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
