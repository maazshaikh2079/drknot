import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";

// for log-in admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const atoken = jwt.sign(email + password, process.env.JWT_SECRET); // atoken: Admin Token
      res.json({ success: true, atoken });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
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
        message: "Password length should be more than 7",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    const imageUpload = await cloudinary.uploader.upload(imageFile.buffer, {
      resource_type: "image",
      folder: "drknot",
    });
    const imageUrl = imageUpload.secure_url;

    const newDoctor = new Doctor({
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    });
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added", newDoctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for admin panel
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const appointment = await Appointment.findById(appointmentId);

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

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const users = await User.find({});
    const appointments = await Appointment.find({});

    const dashboardData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
