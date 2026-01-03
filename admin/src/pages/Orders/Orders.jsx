import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = "http://localhost:4000";

  // 🔹 Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${URL}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update order status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(`${URL}/api/order/status`, {
        orderId,
        status,
      });
      fetchOrders(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="orders-loading">Loading orders...</p>;
  }

  return (
    <div className="orders">
      <h2>Admin Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          {/* HEADER */}
          <div className="order-header">
            <p><b>Order ID:</b> {order._id}</p>
            <span className={`status ${order.status?.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          {/* USER */}
          <p><b>User:</b> {order.userId?.name} ({order.userId?.email})</p>

          {/* ITEMS */}
          <div className="order-items">
            {order.items.map((item, idx) => (
              <div className="order-item" key={idx}>
                <span>{item.name}</span>
                <span>
                  ₹{item.price} × {item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          <p>
            <b>Address:</b>{" "}
            {order.address?.street}, {order.address?.city}
          </p>

          {/* FOOTER */}
          <div className="order-footer">
            <p>Total: ₹{order.amount}</p>
            <p>Payment: {order.paymentStatus}</p>
          </div>

          {/* STATUS CONTROL */}
          <div className="admin-actions">
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="Placed">Placed</option>
              <option value="Preparing">Preparing</option>
              <option value="Out">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;