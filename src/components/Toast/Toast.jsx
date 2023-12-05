import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './toast.css';

const ErrorToast = ({ closeToast, message }) => (
  <div>
    {message.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
);

const Toaster = ({ message }) => {
  useEffect(() => {
    if (message?.error) {
      toast.error(<ErrorToast message={message.error} />, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } else if (message?.success) {
      toast.success(message.success, {
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
