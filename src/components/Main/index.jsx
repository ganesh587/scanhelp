import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Main = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>fakebook</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;