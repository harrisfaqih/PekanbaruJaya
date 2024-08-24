import React, { useEffect, useState } from "react";
import error from "../assets/error.png";
import success from "../assets/success.png";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import axios from "axios";

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState("succeeded"); // Set default ke "succeeded" untuk COD

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    update_payment(); // Panggil fungsi ini langsung
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <img src={error} alt="" />
          <Link
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
            to="/dashboard/my-orders"
          >
            Back to Dashboard{" "}
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src={success} alt="" />
            <Link
              className="px-5 py-2 bg-green-500 rounded-sm text-white"
              to="/dashboard/my-orders"
            >
              Back to Dashboard{" "}
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
