import orderModel from "../models/ordermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ================= PLACE ORDER ================= */
import foodModel from "../models/foodmodels.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.json({ success: false, message: "All fields required" });
    }

    // 🔥 Build full items with name + price
    const detailedItems = [];

    for (let item of items) {
      const food = await foodModel.findById(item.foodId);

      detailedItems.push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity
      });
    }

    const newOrder = new orderModel({
      userId,
      items: detailedItems,
      amount,
      address,
      paymentMethod: "ONLINE",
      paymentStatus: "pending",
      status: "Placed"
    });

    const savedOrder = await newOrder.save();

  const session = await stripe.checkout.sessions.create({
  mode: "payment",
  payment_method_types: ["card"],

  line_items: detailedItems.map(item => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // ✅ per item price
    },
    quantity: item.quantity,
  })),

  success_url: `http://localhost:5173/verify?success=true&orderId=${savedOrder._id}`,
  cancel_url: `http://localhost:5173/cart`,
});



    res.json({ success: true, sessionUrl: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


const updateOrderStatususer = async (req, res) => {
  try {
    const { orderId, status, paymentStatus } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status,
      paymentStatus
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};




/* ================= VERIFY PAYMENT ================= */const verifyOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      await orderModel.findByIdAndUpdate(
        session.metadata.orderId,
        { paymentStatus: "paid" }
      );

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Verification failed" });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user.id })
      .populate("items.foodId", "name price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, data:orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


/* ================= ALL ORDERS (ADMIN) ================= */
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderStatususer
};
