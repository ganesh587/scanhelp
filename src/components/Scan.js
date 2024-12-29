import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import config from "../config";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const Scan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalOpen } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const tagId = queryParams.get("t_id");
  const tagType = queryParams.get("t_t");

  useEffect(() => {
    const scanProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${config.API_URL}/scan`, {
          tag_id: tagId,
          tag_type: tagType,
        });

        if (response.data.error) {
          setError(response.data.error);
          localStorage.setItem("tag_id", tagId);
          localStorage.setItem("tag_type", tagType);
          navigate("/app/login");
        } else {
          navigate("/app/scanned-product", { state: response.data });
        }
      } catch (error) {
        setError(error);
        setModalOpen(true);
      } finally {
        setLoading(false);
      }
    };

    scanProduct();
  }, [navigate, tagId, tagType, setModalOpen]);

  return <div>{loading && <Spinner />}
    {error && (
        <Message
          type="error"
          message={error}
          duration={5000}
          onClose={() => setError("")}
        />
      )}</div>;
};

export default Scan;
