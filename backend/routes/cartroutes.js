import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  removeFromCart,
  getCart
} from "../controllers/cartcontrollers.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCart);

export default cartRouter;
