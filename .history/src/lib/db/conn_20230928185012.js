import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in environment variables");
    return;
  }

  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("MongoDB is Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
