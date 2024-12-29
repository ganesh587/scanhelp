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
      <h1>
      Register ScanNHelp Tag
      </h1>
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
