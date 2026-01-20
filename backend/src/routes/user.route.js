import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfileData,
  updateUserProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
// import fileUpload from "../middlewares/multer-local.js";
import fileUpload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getUserProfileData);

userRouter.patch(
  "/update-profile",
  fileUpload.single("image"),
  authUser,
  updateUserProfile
);

userRouter.post("/book-appointment", authUser, bookAppointment);

userRouter.get("/appointments", authUser, listAppointments);

userRouter.patch("/cancel-appointment", authUser, cancelAppointment);

userRouter.post("/payment-razorpay", authUser, paymentRazorpay);

userRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default userRouter;
