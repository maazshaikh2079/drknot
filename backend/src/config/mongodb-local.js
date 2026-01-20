import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("log> MongoDB Connected Successfully!")
    );

    await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );
  } catch (error) {
    console.error("log> MongoDB Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;
