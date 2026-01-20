/**
 * NOTE: This is the database configuration for LOCAL DEVELOPMENT (Persistent).
 * Strategy: Traditional Event-Driven Mongoose Connection.
 * * Reason: This setup is designed for a persistent Node.js process where the
 * connection is established once at startup. It features:
 * 1. Status Logging: Utilizes event listeners to provide real-time feedback in the
 * terminal when the local database connects or fails.
 * 2. Simplicity: Avoids the complexity of middleware caching, as the local server
 * process remains alive and maintains its own state.
 * 3. Debugging: Provides clear error logs for troubleshooting local MongoDB
 * URI or database name issues.
 */

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
