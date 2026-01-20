import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import razorpay from "razorpay";
// import stripe from "stripe";

import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking for all data to register user
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please must have more than 7 chars",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Add a log right before saving to verify the object structure
    // console.log("Saving user object:", newUser);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifiedUser = await User.findOne({ email });

    if (!identifiedUser) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      identifiedUser.password
    );

    if (isValidPassword) {
      const token = jwt.sign(
        { id: identifiedUser._id },
        process.env.JWT_SECRET
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getUserProfileData = async (req, res) => {
  try {
    // const userId = req.body.userId;
    // const { userId } = req.body;

    const userId = req.userData.userId;
    // const { userId } = req.userData;

    const userData = await User.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateUserProfile = async (req, res) => {
  try {
    // const { userId, name, phone, address, dob, gender } = req.body;
    const userId = req.userData.userId;
    const { name, phone, address, dob, gender } = req.body;

    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      const imageUpload = await cloudinary.uploader.upload(imageFile.buffer, {
        resource_type: "image",
        folder: "drknot",
      });
      const imageURL = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const { docId, slotDate, slotTime } = req.body;

    const doctor = await Doctor.findById(docId).select("-password");
    if (!doctor.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = doctor.slots_booked; // Eg. { "20_01_2026": ["10:00 AM", "11:00 AM"], "": [], ... }

    // checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const user = await User.findById(userId).select("-password");

    delete doctor.slots_booked;

    const newAppointment = new Appointment({
      userId,
      docId,
      userData: user,
      docData: doctor,
      amount: doctor.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    });
    await newAppointment.save();

    // save new slots data in doctor
    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointments = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const appointments = await Appointment.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    // verify appointment user
    if (appointment.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointment;

    const doctor = await Doctor.findById(docId);

    let slots_booked = doctor.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );

    // slots_booked[slotDate] === []
    if (!slots_booked[slotDate].length) {
      delete slots_booked[slotDate];
    }

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment || appointment.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    // creating options for razorpay payment
    const options = {
      amount: appointment.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of razorpay and mark `payment` field `true` in appointment document
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log("log> user.controller.js - verifyRazorpay() - orderInfo:-");
    console.log(orderInfo);

    if (orderInfo.status === "paid") {
      await Appointment.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfileData,
  updateUserProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
