import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await Doctor.findById(docId);
    await Doctor.findByIdAndUpdate(docId, {
      available: !doctor.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for Frontend
const getDoctorList = async (_, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]); // returns array of doctor objects without password and email
    // console.log("log> doctors:-\n", doctors); // [ {}, {}, ... ]
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, doctor.password);

    if (isValidPassword) {
      const dtoken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, dtoken });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docData.docId;
    const appointments = await Appointment.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docData.docId;
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment)
      return res.json({ success: false, message: "Appointment not found" });

    if (appointment.docId.toString() !== docId)
      return res.json({ success: false, message: "Unauthorized action" });

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing doctor slot :-

    const { slotDate, slotTime } = appointment;

    const doctor = await Doctor.findById(docId);

    let slots_booked = doctor.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );

    // if slots_booked[slotDate] = []
    if (!slots_booked[slotDate].length) delete slots_booked[slotDate];

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to Mark appointment completed using API
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docData.docId;
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment)
      return res.json({ success: false, message: "Appointment not found" });

    if (appointment.docId.toString() !== docId)
      return res.json({ success: false, message: "Unauthorized action" });

    await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });

    // releasing doctor slot :-

    const { slotDate, slotTime } = appointment;

    const doctor = await Doctor.findById(docId);

    let slots_booked = doctor.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );

    // if slots_booked[slotDate] = []
    if (!slots_booked[slotDate].length) delete slots_booked[slotDate];

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docData.docId;

    const appointments = await Appointment.find({ docId });

    let earnings = 0;

    appointments.map((appointment) => {
      if (appointment.isCompleted || appointment.payment)
        earnings += appointment.amount;
    });

    let patients = [];

    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId))
        patients.push(appointment.userId);
    });

    const dashboardData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Getting Doctor profile data from Database using API
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docData.docId;
    const docProfileData = await Doctor.findById(docId).select("-password");

    res.json({ success: true, docProfileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docData.docId;
    const { about, fees, address, available } = req.body;

    await Doctor.findByIdAndUpdate(docId, { about, fees, address, available });

    res.json({ success: true, message: "Doctor Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  getDoctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
