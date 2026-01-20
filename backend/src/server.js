/**
 * NOTE: This is the main entry-point optimized for VERCEL DEPLOYMENT.
 * Strategy: Hybrid Serverless-Friendly Architecture.
 * * Reason: Vercel executes code as ephemeral Serverless Functions. This file includes:
 * 1. Global DB Middleware: Uses 'app.use(dbConn)' to ensure MongoDB connectivity
 * before any API logic executes, preventing "bufferCommands" errors.
 * 2. Conditional Listening: Only triggers 'app.listen()' if 'process.env.VERCEL'
 * is missing, allowing the same file to be used in production and local testing.
 * 3. Stateless Handling: Designed to initialize external services efficiently
 * across transient function instances to stay within execution time limits.
 */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
// import connectDB from "./config/mongodb-local.js";
import dbConn from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

// Disable buffering for serverless environment
mongoose.set("bufferCommands", false);

// Middleware
app.use(express.json());
app.use(cors());

// Initialize external services
// connectDB(); // Local mongodb connections (mongodb-local.js)
app.use(dbConn);
connectCloudinary();

// Routes
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (_, res) =>
  res.send(`
    <title>DrKnot-Server</title>
    <body style="background: #121212; font-family: sans-serif">
      <h1 style='color: #5f6fff'>DrKnot Backend Server</h1>
    <body>
  `)
);
app.get("/favicon.ico", (_, res) => res.status(204).end());

// Local Listener
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`log> Local server running on PORT:${PORT}`);
    console.log(`log> Health Check: http://localhost:${PORT}/`);
  });
}

export default app;
