// import mongoose from "mongoose";

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI!);
//     console.log(" ✅MongoDB Connected");
//   } catch (error) {
//     console.error(" ❌MongoDB Connection Error", error);
//     process.exit(1);
//   }
// }

// export default connectDB;

// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // Ensure this is set in .env.local

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Connection failed");
  }
};
