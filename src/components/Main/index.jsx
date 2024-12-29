import React, { useEffect } from 'react';
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
const Main = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      navigate("/app/products");
    } else {
      navigate("/app/login");
    }
  };

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event) => {

      if (event.data.action === 'login') {
        navigate("/app/login");
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);


  return (
    <div className={styles.main_container}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <button className={styles.login_button} onClick={handleButtonClick}>
      Register ScanNHelp Tag
      </button>
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
