import mongoose from "mongoose";
import "dotenv/config";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully... 😊");
  } catch (err) {
    console.log("Failed to connect to MongoDB... 😢");
    console.error(err);
  }
};

export default db;
