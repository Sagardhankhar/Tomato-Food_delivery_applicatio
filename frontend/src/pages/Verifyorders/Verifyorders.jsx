import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Verifyorders.css";

const Verifyorders = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(""); // success | failed

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (success === "true" && orderId) {
          // ✅ Update order as paid
          await axios.post("http://localhost:4000/api/order/status", {
            orderId,
            status: "Placed",
            paymentStatus: "paid",
          });

          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.log(error);
        setStatus("failed");
      } finally {
        setLoading(false); // ✅ IMPORTANT
      }
    };

    verifyPayment();
  }, [success, orderId]);

  const goToHome = () => {
    navigate("/");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="verify-container">
      <div className="verify-box">

        {loading && (
          <>
            <div className="spinner"></div>
            <p>Verifying your payment...</p>
          </>
        )}

        {!loading && status === "success" && (
          <div className="verify-success">
            <span>✅</span>
            <h2>Payment Successful</h2>
            <p>Your order has been placed successfully.</p>
            <button className="verify-btn" onClick={goToHome}>
              Go to Home
            </button>
          </div>
        )}

        {!loading && status === "failed" && (
          <div className="verify-fail">
            <span>❌</span>
            <h2>Payment Failed</h2>
            <p>Something went wrong. Please try again.</p>
            <button className="verify-btn" onClick={goToCart}>
              Back to Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Verifyorders;
