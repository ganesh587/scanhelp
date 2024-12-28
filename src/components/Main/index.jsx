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
        <iframe
        src="/main.html"  // The path to your HTML file
        title="Embedded HTML Page"
        width="100%"  // Adjust as needed
        height="600px"  // Adjust as needed
        frameBorder="0"
      />
    </div>
  );
};

export default Main;