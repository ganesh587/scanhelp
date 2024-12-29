import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/app/login");
  };

  return (
    <div className={styles.main_container}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <button className={styles.login_button} onClick={handleLogout}>Login</button>
      <iframe
        id="myIframe"
        src="/main.html"
        title="Embedded HTML Page"
        width="100%"
        height="600px"
        frameBorder="0"
      />
    </div>
  );
};

export default Main;
