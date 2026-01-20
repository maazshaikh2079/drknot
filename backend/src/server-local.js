import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb-local.js";
import connectCloudinary from "./config/cloudinary.js";

// Disable buffering so queries fail fast if DB isn't connected
mongoose.set("bufferCommands", false);

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// route imports
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// BASIC route
app.get("/", (_, res) =>
  res.send(`
    <title>DrKnot-Server</title>
    <body style="background: #121212; font-family: sans-serif">
      <h1 style='color: #5f6fff'>DrKnot Backend Server</h1>
    <body>
    `)
);
app.get("/favicon.ico", (_, res) => res.status(204).end());

app.listen(PORT, () => {
  // console.log(`log> DrKnot Backend Server Running!`);
  console.log(`log> Local server running on PORT:${PORT}`);
  console.log(`log> Health Check: http://localhost:${PORT}/`);
});

export default app;
