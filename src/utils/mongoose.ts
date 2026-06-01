
import mongoose from "mongoose"

type Connection = {
  isConnected?: number | boolean
}
const connection:Connection = {};

export const connectToDb = async () => {
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGOOSE_URI || '', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};