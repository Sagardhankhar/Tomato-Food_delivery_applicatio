import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Orders = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(url + "/api/order/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setOrders(res.data.data || []);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.log(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, url]);

  if (!token) {
    return <p className="orders-loading">Please login to view orders</p>;
  }

  if (loading) {
    return <p className="orders-loading">Loading orders...</p>;
  }

  return (
    <div className="orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span>Order ID: {order._id}</span>
              <span className="status">{order.status}</span>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div className="order-item" key={idx}>
                  <span>{item.foodId?.name || "Food Item"}</span>
                  <span>
                    ₹{item.foodId?.price} × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <p>Total: ₹{order.amount}</p>
              <p>Payment: {order.paymentStatus}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
