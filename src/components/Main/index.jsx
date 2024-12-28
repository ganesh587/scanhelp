import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Helmet } from 'react-helmet';
const Main = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={styles.main_container}>
         <Helmet>
        <title>Home</title>
      </Helmet>
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