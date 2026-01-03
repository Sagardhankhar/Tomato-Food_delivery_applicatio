
// create three arrow function addtocart removefromcart getcart
import cartModel from "../models/cartmodels.js";
import userModel from "../models/usermodel.js";

// ================= ADD TO CART ================= to user
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;      // from auth middleware
    const { foodId } = req.body;

    if (!foodId) {
      return res.json({ success: false, message: "Food ID required" });
    }

    let cart = await cartModel.findOne({ userId });

    // if cart not exists → create new
    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ foodId, quantity: 1 }]
      });
    } else {
      // check if food already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ foodId, quantity: 1 });
      }
    }

    await cart
    .save();
    res.json({ success: true, message: "Item added to cart", cart });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

// ================= REMOVE FROM CART ================= to user
const removeFromCart = async (req, res) => {
   try {
    const userId = req.user.id;
    const { foodId } = req.body;

    if (!foodId) {
      return res.json({ success: false, message: "Food ID required" });
    }

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (itemIndex === -1) {
      return res.json({ success: false, message: "Item not in cart" });
    }

    // quantity kam karo ya item remove karo
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      cart
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

// ================= fetch USER CART ================= to user
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.foodId");

    if (!cart) {
      return res.json({ success: true, cart: [] });
    }

    res.json({ success: true, cart });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

// ================= CLEAR CART =================
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await cartModel.findOneAndDelete({ userId });

    res.json({ success: true, message: "Cart cleared" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart, clearCart };
