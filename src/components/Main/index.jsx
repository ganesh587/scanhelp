import React, { useEffect } from 'react';
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.action === 'login') {
        navigate("/app/login");
      }
      if (event.data.action === 'register') {
        navigate("/app/signup");
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  return (
    <div className={styles.main_container}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <iframe
        id="myIframe"
        src="/main.html"
        title="Embedded HTML Page"
        frameBorder="0"
      />
    </div>
  );
};

export default Main;
