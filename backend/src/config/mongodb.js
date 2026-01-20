// import mongoose from "mongoose";

// // A global variable to cache the connection
// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) {
//     console.log("log> Using existing MongoDB connection");
//     return;
//   }

//   try {
//     const db = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
//       {
//         connectTimeoutMS: 10000,
//         socketTimeoutMS: 45000,
//       }
//     );

//     isConnected = db.connections[0].readyState;
//     console.log("log> New MongoDB Connection Established!");
//   } catch (error) {
//     console.error("log> MongoDB Connection Error:", error.message);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

// Local variable to cache the connection status in serverless memory
let isConnected = false;

const dbConn = async (_, res, next) => {
  // If we're already connected, proceed immediately to the controller
  if (isConnected && mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    // Attempt to establish the connection using environment variables
    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        connectTimeoutMS: 10000, // 10s timeout for cold starts
        socketTimeoutMS: 45000,
      }
    );

    // Update the cache status
    isConnected = db.connections[0].readyState === 1;

    console.log("log> MongoDB connection established!");
    next();
  } catch (error) {
    console.error("log> Database connection failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed. Please try again in 60 seconds.",
    });
  }
};

export default dbConn;
