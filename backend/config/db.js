
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sagarjaat659:sagarjaat2612@cluster0.r4o3krn.mongodb.net/food-del');
    console.log("DB is connected");
  } catch (error) {
    console.log("DB connection failed:", error.message);
  }
};
