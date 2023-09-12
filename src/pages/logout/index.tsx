import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  console.log("Logout");
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);

  toast.success(`Logout Successfully`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  return <Navigate to="/signin" />;
};

export default Logout;
