import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  placeOrder,verifyOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderStatususer
} from "../controllers/ordercontroller.js";

const orderRouter = express.Router();

// USER
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.get("/myorders",authMiddleware,getUserOrders);
orderRouter.post("/status",updateOrderStatususer);

// ADMIN
orderRouter.get("/list", getAllOrders);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;
