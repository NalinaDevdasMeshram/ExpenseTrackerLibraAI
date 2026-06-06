import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const dburl = await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    console.log(`MongoDB connected:${dburl.connection.host}`);
    console.log(`mongodb connected successfully...`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default connectDB;
