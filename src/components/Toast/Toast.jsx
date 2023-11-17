import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './toast.css'
const Toaster = ({ message }) => {
  // const notify = (msg) => toast(msg);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } else if (message?.success) {
      toast.success(message?.success, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        className: "toast-success",
        progress: undefined,
      });
    }
    
  }, [message]);
  return <ToastContainer />;
};

export default Toaster;
