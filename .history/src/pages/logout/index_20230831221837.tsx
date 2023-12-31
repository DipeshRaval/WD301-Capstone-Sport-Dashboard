import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);
  
  return <Navigate to="/" />;
};

export default Logout;
