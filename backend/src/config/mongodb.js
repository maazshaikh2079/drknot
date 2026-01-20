/**
 * NOTE: This is the database configuration optimized for PRODUCTION (Vercel).
 * Strategy: Serverless-Friendly Connection Middleware.
 * * Reason: Vercel functions are stateless and ephemeral. This file implements:
 * 1. Connection Caching: Uses a global variable to reuse existing MongoDB connections
 * across function "warm starts," preventing connection limit exhaustion.
 * 2. Handshake Verification: Explicitly checks the 'readyState' of the connection
 * to ensure the database is fully accessible before proceeding.
 * 3. Cold Start Protection: Designed to handle the initial delay of serverless
 * boot-up sequences without triggering "bufferCommands" errors.
 */

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
