import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 🔗 USER who placed the order
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    // 🛒 ORDER ITEMS
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],

    // 📍 DELIVERY ADDRESS
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },

    // 💰 PRICE DETAILS
    amount: {
      type: Number,
      required: true
    },

    deliveryFee: {
      type: Number,
      default: 0
    },

    // 💳 PAYMENT
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },

    // 📦 ORDER STATUS
    status: {
      type: String,
      enum: ["Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Placed"
    }
  },
  {
    timestamps: true
  }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
